from rest_framework import serializers
from .models import Dashboard, Device, Parameter, Query, Report, Role, Session, Statistic \
    ,Thing, Ticket, User, Team, Organization, Site, Project \
    , OrganizationMembership, TeamMembership, TeamSite, Log, Alert;


class RoleSeriailzer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):

    role = RoleSeriailzer(required=False)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    role_id = serializers.IntegerField(required=False)
    # organizations = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all(), many=True, required=False)
    # teams = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), many=True, required=False)

    class Meta:
        model = User
        fields=('id', 'email', 'nickname', 'password', 'role', 'role_id', 'teams', 'organizations', 'telephone','last_login')
        extra_kwargs = {'password': {'write_only': True}}
        depth = 1

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class TeamSerializer(serializers.ModelSerializer):

    # projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)
    users = UserSerializer(required=False, many=True)
    # organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Team
        fields = ['name', 'id', 'users', 'sites', 'organization', 'organization_id', 'description']
        depth=1

class QuerySerializer(serializers.ModelSerializer):
    # statistic = StatisticSerializer(required=False)
    statistic_id = serializers.IntegerField(required=False)

    class Meta:
        model = Query
        fields = ['id', 'text', 'column','interval', 'function', 'statistic', 'statistic_id']
        read_only_fields = ['statistic']

class StatisticSerializer(serializers.ModelSerializer):

    # dashboard = DashboardSerializer(required=False)
    dashboard_id = serializers.IntegerField(required=False)
    queries = QuerySerializer(many=True, required=False)

    class Meta:
        model = Statistic
        fields = ['id','name','type','x_coordinate','y_coordinate','width','height', 
                    'dashboard_id', 'dashboard', 'queries']
        # read_only_fields = ['queries']
        # write_only_fields = ('query_ids')
        # extra_kwargs = {'query_ids': {'write_only': True}}
        depth = 2

class DashboardSerializer(serializers.ModelSerializer):

    # site = SiteSerializer(required=False)
    site_id = serializers.IntegerField(required=False)
    statistics = StatisticSerializer(many=True, required=False)

    class Meta:
        model = Dashboard
        fields = ['id', 'name', 'type', 'site_id', 'site', 'statistics', 'parameters', 'intervals']
        depth = 4


class SiteSerializer(serializers.ModelSerializer):

    projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    teams =  TeamSerializer(many=True, required=False)
    # organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    dashboards = DashboardSerializer(many=True, required=False)

    class Meta:
        model = Site
        fields= ['id','name', 'teams','disco', 'note', 'organization', 'organization_id' \
            , 'projects', 'lat', 'lng', 'dashboards', 'things']
        depth = 2

class OrganizationSerializer(serializers.ModelSerializer):

    users = UserSerializer(required=False, many=True)
    sites =  SiteSerializer(required=False, many=True)
    # teams = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), many=True, required=False)
    # sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)

    class Meta:
        model = Organization
        fields = ['name', 'id', 'teams', 'sites', 'users', 'note', 'timezone', 'disco', 'theme']
        depth = 3



class ParameterSerializer(serializers.ModelSerializer):
    dashboard = DashboardSerializer(required=False)
    dashboard_id = serializers.IntegerField(required=False)

    class Meta:
        model = Parameter
        fields = ['id', 'text', "dashboard", 'dashboard_id']

class TeamSiteSerializer(serializers.ModelSerializer):

    team = TeamSerializer(required=False)
    site = SiteSerializer(required=False)
    team_id = serializers.IntegerField(required=False)
    site_id = serializers.IntegerField(required=False)
    # sites_ids with a team_id or site_id with teams_ids to add many sites to one team at once or add many teams to one site at once respectively.
    # team_id is teams_ids if the length of the latter is 1 , the same goes for site.
    # 
    
    class Meta:
        model = TeamSite
        fields = ['id', 'team', 'site', 'team_id', 'site_id']
    
    # def create(self, validated_data):
    #     team_id = validated_data['team_id']
    #     site_id = validated_data['site_id']
    #     team = Team.objects.get(id=team_id)
    #     site = Site.objects.get(id=site_id)

    #     try :
    #         old = TeamSite.objects.get(team=team, site=site)
    #         return old 
    #     except:
    #         new = TeamSite.objects.create(team=team, site=site)
    #         return new
        
class ProjectSerializer(serializers.ModelSerializer):

    teams = TeamSerializer(many=True, required=False)
    site = SiteSerializer(required=False)
    site_id = serializers.IntegerField(required=False)

    class Meta:
        model = Project
        fields = ['id', 'name', 'site', 'site_id', 'teams', 'capacity']

# class TeamProjectSerializer(serializers.ModelSerializer):

#     team = TeamSerializer(required=False)
#     project = ProjectSerializer(required=False)
#     team_id = serializers.IntegerField(required=False)
#     project_id = serializers.IntegerField(required=False)

#     class Meta:
#         model = TeamProject
#         fields = ['id', 'team', 'project', 'team_id', 'project_id']

    # def create(self, validated_data):
    #     team_id = validated_data['team_id']
    #     project_id = validated_data['project_id']
    #     team = Team.objects.get(id=team_id) // try
    #     project = Project.objects.get(id=project_id) // try

    #     try:
    #         old = TeamProject.objects.get(team=team, project=project)
    #         return old
    #     except:
    #         new = TeamProject.objects.create(team=team, project=project)
    #         return new


class TeamMembershipSerializer(serializers.ModelSerializer):

    team = TeamSerializer(required=False)
    user = UserSerializer(required=False)
    team_id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)

    class Meta:
        model = TeamMembership
        fields = ['id','team', 'user', 'user_id', 'team_id']
    
    # def create(self, validated_data):

    #     team_id = validated_data['team_id']
    #     user_id = validated_data['user_id']
    #     team = Team.objects.get(id=team_id)
    #     user = User.objects.get(id=user_id)
        
    #     try:
    #         old = TeamMembership.objects.get(user=user, team=team)
    #         # may be updated here : fields: is_team_leader or return an error
    #         return old
    #     except:
    #         new = TeamMembership.objects.create(user=user, team=team, is_team_leader=validated_data['is_team_leader'])
    #         return new

class OraganizationMembershipSerializer(serializers.ModelSerializer):

    organization = OrganizationSerializer(required=False)
    user = UserSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)

    class Meta:
        model = OrganizationMembership
        fields = ['id','is_org_admin', 'organization', 'user', 'user_id', 'organization_id']

    # this overwriting is not needed for creation but for uniqeness 
    def create(self, validated_data):

        organization_id = validated_data['organization_id']
        user_id = validated_data['user_id']
        org = Organization.objects.get(id=organization_id)
        user = User.objects.get(id=user_id)
        
        try:
            old = OrganizationMembership.objects.get(user=user, organization=org)
            # may be updated here : fields: is_org_admin or raise an error
            return old
        except:
            new = OrganizationMembership.objects.create(user=user, organization=org, is_org_admin=validated_data['is_org_admin'])
            return new

class DeviceSerializer(serializers.ModelSerializer):

    site = SiteSerializer(required=False)
    site_id = serializers.IntegerField(required=False)

    class Meta:
        model = Device
        fields = ['id', 'name', 'site', 'site_id']

class ThingSerializer(serializers.ModelSerializer):

    site = SiteSerializer(required=False)
    site_id = serializers.IntegerField(required=False)   

    class Meta:
        model = Thing
        fields = ['id','hardware_id', 'type', 'name', 'status', 'site', 'site_id']

class TicketSerializer(serializers.ModelSerializer):
    site_id = serializers.IntegerField(required=False)
    organization_id = serializers.IntegerField(required=False)
    project_id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)
    class Meta:
        model = Ticket
        fields = ["id", "title", "done", "project", "project_id", "user", "user_id", 'description','site','site_id','organization','organization_id']
        depth = 3

class LogSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    user_id = serializers.IntegerField(required=False)
    class Meta:
        model = Log
        fields = ["id", "title", "user", "user_id","time"]

class AlertSerializer(serializers.ModelSerializer):
    site_id = serializers.IntegerField(required=False)
    site = SiteSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    organization = OrganizationSerializer(required=False)
    user_id = serializers.IntegerField(required=False)
    user = UserSerializer(required=False)
    class Meta:
        model = Alert
        fields = ["id", "name", "user", "user_id", "organization", "organization_id", "site", "site_id", "emails", "description", "query", "dashboard", "operation", "value", "period"]

class ReportSerializer(serializers.ModelSerializer):
    site_id = serializers.IntegerField(required=False)
    site = SiteSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    organization = OrganizationSerializer(required=False)
    user_id = serializers.IntegerField(required=False)
    user = UserSerializer(required=False)
    
    class Meta:
        model  = Report
        fields = ["id", "user", "user_id", "organization", "organization_id", "site", "site_id", "emails", "dashboard", "delivery_time", "period"]

class SessionSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(required=False)
    user = UserSerializer(required=False)
    class Meta:
        model = Session
        fields = ["id", "user", "user_id", "os", "browser", "ip", "logged_on"]

# query , var

class AuthSerializer(serializers.Serializer):
    nickname = serializers.CharField(required=False)
    id = serializers.IntegerField(required=False)
    role_id = serializers.IntegerField(required=False)
    role = RoleSeriailzer(required=False)
    memOrgs = OraganizationMembershipSerializer(required=False, many=True)
    adminOrgs = OraganizationMembershipSerializer(required=False, many=True)
    teams = TeamSerializer(required=False, many=True)
    organizations = OrganizationSerializer(required=False, many=True)