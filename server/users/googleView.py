import requests
from users.models import User
from datetime import datetime
from django.utils import timezone
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from django.conf import settings
from rest_framework import serializers
from rest_framework.response import Response
from django.db import transaction
from rest_framework.views import APIView
from typing import Tuple
from rest_framework import exceptions as rest_exceptions
from rest_framework_simplejwt.tokens import RefreshToken


def get_now() -> datetime:
    return timezone.now()

def user_record_login(*, user: User) -> User:
    user.last_login = get_now()
    user.save()

    return user

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def jwt_login(*, response: HttpResponse, user: User) -> Tuple:

    # generate token 
    tokens = get_tokens_for_user(user)

    # SET Cookie
    response.set_cookie("tokens",tokens)

    user_record_login(user=user)

    return response, tokens

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
def google_validate_id_token(*, id_token: str) -> bool:
    # Reference: https://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': id_token}
    )

    if not response.ok:
        raise ValidationError('id_token is invalid.')

    audience = response.json()['aud']

    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        raise ValidationError('Invalid audience.')

    return True

def user_get_me(*, user: User):
    return {
        'id': user.id,
        'user_name': user.user_name,
        'email': user.email
    }

def get_first_matching_attr(obj, *attrs, default=None):
    for attr in attrs:
        if hasattr(obj, attr):
            return getattr(obj, attr)

    return default

def get_error_message(exc) -> str:
    if hasattr(exc, 'message_dict'):
        return exc.message_dict
    error_msg = get_first_matching_attr(exc, 'message', 'messages')

    if isinstance(error_msg, list):
        error_msg = ', '.join(error_msg)

    if error_msg is None:
        error_msg = str(exc)

    return error_msg

@transaction.atomic
def user_get_or_create(*, email: str, **extra_data) -> Tuple[User, bool]:
    user = User.objects.filter(email=email).first()
    if user:
        return user, False
    return User.objects.create(email=email, role_id=1 , **extra_data), True

class PublicApiMixin:
    authentication_classes = ()
    permission_classes = ()

class ApiErrorsMixin:
    """
    Mixin that transforms Django and Python exceptions into rest_framework ones.
    Without the mixin, they return 500 status code which is not desired.
    """
    expected_exceptions = {
        ValueError: rest_exceptions.ValidationError,
        ValidationError: rest_exceptions.ValidationError,
        PermissionError: rest_exceptions.PermissionDenied,
        User.DoesNotExist: rest_exceptions.NotAuthenticated
    }

    def handle_exception(self, exc):
        if isinstance(exc, tuple(self.expected_exceptions.keys())):
            drf_exception_class = self.expected_exceptions[exc.__class__]
            drf_exception = drf_exception_class(get_error_message(exc))

            return super().handle_exception(drf_exception)

        return super().handle_exception(exc)

class GoogleView(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField()
        first_name = serializers.CharField(required=False, default='')
        last_name = serializers.CharField(required=False, default='')

    def post(self, request, *args, **kwargs):
        id_token = request.headers.get('Authorization')
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, _ = user_get_or_create(**serializer.validated_data)
        response = Response(data=user_get_me(user=user))
        response, tokens = jwt_login(response=response, user=user)
        response.data['access'] = tokens['access']
        response.data['refresh'] = tokens['refresh']
        return response