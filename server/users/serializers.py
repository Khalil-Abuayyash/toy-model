from rest_framework import serializers
from .models import  Chart, Device, Role, Thing, Ticket, User, Team, Organization, Site, Project, OrganizationMembership, TeamMembership, TeamSite

class RoleSeriailzer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):

    role = RoleSeriailzer(required=False)
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    role_id = serializers.IntegerField(required=False)
    # organizations = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all(), many=True, required=False)
    # teams = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), many=True, required=False)

    class Meta:
        model = User
        fields=('id', 'email', 'user_name', 'password', 'role', 'role_id', 'teams', 'organizations', 'telephone')
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

class OrganizationSerializer(serializers.ModelSerializer):

    users = UserSerializer(required=False, many=True)
    # teams = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), many=True, required=False)
    # sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)


    class Meta:
        model = Organization
        fields = ['name', 'id', 'teams', 'sites', 'users']
        depth = 1

class TeamSerializer(serializers.ModelSerializer):

    # projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)
    users = UserSerializer(required=False, many=True)
    organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Team
        fields = ['name', 'id', 'users', 'sites', 'organization', 'organization_id']

class SiteSerializer(serializers.ModelSerializer):

    projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    teams =  TeamSerializer(many=True, required=False)
    organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)

    class Meta:
        model = Site
        fields= ['id','name', 'teams', 'organization', 'organization_id', 'projects']

class TeamSiteSerializer(serializers.ModelSerializer):

    team = TeamSerializer(required=False)
    site = SiteSerializer(required=False)
    team_id = serializers.IntegerField(required=False)
    site_id = serializers.IntegerField(required=False)
    
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
        fields = ['id', 'name', 'site', 'site_id', 'teams']

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
        fields = ['id', 'is_team_leader', 'team', 'user', 'user_id', 'team_id']
    
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

    project = ProjectSerializer(required=False)
    project_id = serializers.IntegerField(required=False)   

    class Meta:
        model = Thing
        fields = ['id', 'type', 'device', 'device_id', 'project', 'project_id']

class ChartSerializer(serializers.ModelSerializer):

    project = ProjectSerializer(required=False)
    project_id = serializers.IntegerField(required=False)  

    class Meta:
        model = Chart
        fields = ['id', 'name', 'type', 'x_label', 'y_label', 'x_scale', 'y_scale', 'query', 'x_coordinate', 'y_coordinate' ,'project', 'project_id', ]

class TicketSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = ["id", "title", "project", "project_id", "user", "user_id"]
        depth = 3