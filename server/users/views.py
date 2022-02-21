from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django.db import IntegrityError


# models 
from .models import Role, Ticket, User, Organization, OrganizationMembership, Project, Site, TeamMembership, TeamSite, Team, Log

# serializers
from .serializers import LogSerializer, OraganizationMembershipSerializer, OrganizationSerializer, RoleSeriailzer, SiteSerializer, TeamMembershipSerializer \
    , TeamSerializer, TicketSerializer, UserSerializer, ProjectSerializer, TeamSiteSerializer, AuthSerializer

# services
from .services import send_verification_code

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success","true"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields=['id','nickname','organizations__name','email']

    def create(self, request, *args, **kwargs):
        data = request.data
        try :
            # new_user = User.objects.create(nickname=data["nickname"], email=data["email"], password=data["password"], telephone=data["telephone"], role_id=data["role_id"])
            new_user = User(nickname=data["nickname"], email=data["email"], telephone=data["telephone"], role_id=data["role_id"])
            if data["password"] is not None:
                new_user.set_password(data["password"])
            new_user.save()
        except IntegrityError as e:
            return HttpResponseBadRequest(e.__cause__)

        for organization in data["organizations"]:
            organization_object = Organization.objects.get(name=organization["name"])
            OrganizationMembership.objects.create(organization_id=organization_object.id, user_id=new_user.id, is_org_admin=False)
        
        for team in data["teams"]:
            team_object = Team.objects.get(name=team["name"])
            new_user.teams.add(team_object)
        
        serializer = UserSerializer(new_user)
        return Response(serializer.data)

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = PageNumberPagination
    # filter_backends = [filters.SearchFilter]
    # search_fields=['id','nickname','organizations__name','email']

class SiteViewSet(ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields=['id','name','organization__name']

class TeamViewSet(ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields=['id','name','organizations__name','sites__name']

    def create(self, request, *args, **kwargs):
        data = request.data
        try :
            new_team = Team.objects.create(name=data["name"], description=data["description"], organization_id=data["organization_id"])
            new_team.save()
        except IntegrityError as e:
            return HttpResponseBadRequest(e.__cause__)

        for user in data["users"]:
            # user_object = User.objects.get(id=user["id"])
           TeamMembership.objects.create(team_id=new_team.id, user_id=user["id"])
        
        for site in data["sites"]:
            TeamSite.objects.create(team_id=new_team.id, site_id=site["id"])

        serializer = TeamSerializer(new_team)
        return Response(serializer.data)

class OrganizationViewSet(ModelViewSet):
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields=['id','name','teams__name','disco']

    def create(self, request, *args, **kwargs):
        data = request.data
        try :
            new_org = Organization.objects.create(name=data["name"], note=data["note"], timezone=data["timezone"], disco=data["disco"], theme=data["theme"])
            new_org.save()
        except IntegrityError as e:
            return HttpResponseBadRequest(e.__cause__)

        for user in data["admins"]:
            # user_object = User.objects.get(id=user["id"])
            OrganizationMembership.objects.create(organization_id=new_org.id, user_id=user["id"], is_org_admin=True)

        serializer = OrganizationSerializer(new_org)
        return Response(serializer.data)

class TeamSiteViewSet(ModelViewSet):
    serializer_class = TeamSiteSerializer
    queryset = TeamSite.objects.all()

# class TeamProjectViewSet(ModelViewSet):
#     serializer_class = TeamProjectSerializer
#     queryset = TeamProject.objects.all()

class TeamMembershipViewSet(ModelViewSet):
    serializer_class = TeamMembershipSerializer
    queryset = TeamMembership.objects.all()

class OrganizationMembershipViewSet(ModelViewSet):
    serializer_class = OraganizationMembershipSerializer
    queryset = OrganizationMembership.objects.all()

class CookieView(APIView):
    def get(self, request):
        # send_verification_code()
        res = Response("testing cookies")
        res.set_cookie("testing","postman? browser?")
        return res

class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

class LogViewSet(ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()

class RoleViewSet(ModelViewSet):
    serializer_class = RoleSeriailzer
    queryset = Role.objects.all()

class AuthenticatedView(APIView):
    def get(self, request, user_id, *args, **kwargs):
        # print(request)
        # print(request.query_params)
        user = User.objects.filter(id=user_id).first()
        if user:
            memOrgs =  OrganizationMembership.objects.filter(user_id=user.id, is_org_admin=False) or []
            adminOrgs = OrganizationMembership.objects.filter(user_id=user.id, is_org_admin=True) or []
            auth = {"nickname":user.nickname, "id":user.id, "role_id":user.role_id, "role":user.role , "memOrgs":memOrgs, "adminOrgs":adminOrgs, "teams":user.teams}
            serializer = AuthSerializer(auth)
            # serializer.is_valid(raise_exception=False)
            # print(serializer.errors)
            response = Response(data=serializer.data)
            return response
        response = Response(data={"user":"no such user"})
        return response
        