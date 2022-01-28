from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

# models 
from .models import User, Organization, OrganizationMembership, Project, Site, TeamMembership, TeamSite, Team

# serializers
from .serializers import OraganizationMembershipSerializer, OrganizationSerializer, SiteSerializer, TeamMembershipSerializer \
    , TeamSerializer, UserSerializer, ProjectSerializer, TeamSiteSerializer

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

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class SiteViewSet(ModelViewSet):
    serializer_class = SiteSerializer
    queryset = Site.objects.all()

class TeamViewSet(ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

class OrganizationViewSet(ModelViewSet):
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()

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

