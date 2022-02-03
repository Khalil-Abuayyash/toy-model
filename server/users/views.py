from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


# models 
from .models import Role, Ticket, User, Organization, OrganizationMembership, Project, Site, TeamMembership, TeamSite, Team, Log

# serializers
from .serializers import LogSerializer, OraganizationMembershipSerializer, OrganizationSerializer, RoleSeriailzer, SiteSerializer, TeamMembershipSerializer \
    , TeamSerializer, TicketSerializer, UserSerializer, ProjectSerializer, TeamSiteSerializer

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

    def create(self, request, *args, **kwargs):
        data = request.data
        new_user = User.objects.create(nickname=data["nickname"], email=data["email"], password=data["password"], telephone=data["telephone"], role_id=data["role_id"])
        new_user.save()

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