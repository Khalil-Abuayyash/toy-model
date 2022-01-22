import re
from rest_framework import serializers
from .models import  User, Team, Organization, Site, Project, OrganizationMembership, TeamMembership, TeamSite, TeamProject

# Regarding User Serializer
# m2m Team ### Done
# m2m Organization ### Done

# regarding Site Serializer
# Site has many projects ### Done 
# Organization has many sites ### Done
# Site m2m Team ### Done

# Regarding Team Serializer
# m2m Users ### Done
# m2m Sites ### Done
# m2m Projects ### Done
# many to 1 Organization ###Done

# Regarding Organiztion Serializer
# one2many Team ###Done
# 1 to many Site ### Done
# m2m Users  ### Done

# Regarding Project Serializer
# many to one  ###Done
# many to many Team ### Done

#Regarding Pivot Tables
# team site ### Done
# team project ### Done
# team membership ### Done
# org membership ### Done

class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields=('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

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
    teams = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), many=True, required=False)
    sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)

    class Meta:
        model = Organization
        fields = ['name', 'id', 'teams', 'sites', 'users']

class TeamSerializer(serializers.ModelSerializer):

    projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    sites = serializers.PrimaryKeyRelatedField(queryset=Site.objects.all(), many=True, required=False)
    users = UserSerializer(required=False, many=True)
    organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)
    
    class Meta:
        model = Team
        fields = ['name', 'id', 'users', 'sites', 'projects', 'organization', 'organization_id']

class SiteSerializer(serializers.ModelSerializer):

    projects = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), many=True, required=False)
    teams =  TeamSerializer(many=True, required=False)
    organization = OrganizationSerializer(required=False)
    organization_id = serializers.IntegerField(required=False)

    class Meta:
        model = Site
        fields= ['id','name', 'teams', 'organization', 'organization_id', 'projects']

    # def create(self, validated_data):
    #     org_id = validated_data['org_id']
    #     org = Organization.objects.get(id=org_id)
    #     new_site = Site.objects.create(name=validated_data['name'], organization=org)
    #     return new_site

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

class TeamProjectSerializer(serializers.ModelSerializer):

    team = TeamSerializer(required=False)
    project = ProjectSerializer(required=False)
    team_id = serializers.IntegerField(required=False)
    project_id = serializers.IntegerField(required=False)

    class Meta:
        model = TeamProject
        fields = ['id', 'team', 'project', 'team_id', 'project_id']

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

    # this overwriting is needed for creation but ofr uniqeness 
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