from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class Role(models.Model):

    class Meta:
        db_table = "role"
    
    name = models.CharField(max_length=50, unique=True)

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):
        role = Role.objects.get(id=1)
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, role=role, **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    # teams:m2m, organizations:m2m

    class Meta:
        db_table = "user"

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    telephone = models.CharField(max_length=15, blank=True, unique=False)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    role = models.ForeignKey(Role, related_name="users", on_delete=models.DO_NOTHING)
    is_staff = models.BooleanField(default=False)
    # is_admin = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

class Organization(models.Model):
    # sites:one2many, teams:one2many, users:m2m

    class Meta:
        db_table = "orgaznization"

    name = models.CharField(max_length=50, unique=True)
    users = models.ManyToManyField(User, through='OrganizationMembership', related_name='organizations')

class Team(models.Model):
    # projects:m2m , sites:m2m, organization:many2one, users:m2m

    class Meta:
        db_table = "team"

    name = models.CharField(max_length=50, unique=True)
    users = models.ManyToManyField(User, through='TeamMembership', related_name='teams')
    organization = models.ForeignKey(Organization, related_name='teams', on_delete=models.CASCADE)

class Site(models.Model):
    # teams:m2m, organizations:many2one, projects:one2many

    class Meta:
        db_table = "site"

    teams = models.ManyToManyField(Team, related_name='sites')
    name = models.CharField(max_length=50, unique=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='sites')

class Project(models.Model):
    # teams:m2m, site:many2one

    class Meta:
        db_table = "project"
    
    # teams = models.ManyToManyField(Team, related_name='projects')
    name = models.CharField(max_length=50, unique=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name="projects")

class TeamMembership(models.Model):
    #  a pivot table (team,user)
    class Meta:
        db_table = "team_membership"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    # is_team_leader = models.BooleanField()
    
class OrganizationMembership(models.Model):
    #  a pivot table (org,user)
    class Meta:
        db_table = "organization_membership"
        # unique_together = (("user", "organization"),)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    is_org_admin = models.BooleanField()

class TeamSite(models.Model):
    #  a pivot table (team,site)
    class Meta:
        db_table = "team_site"
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)

# class TeamProject(models.Model):
#     #  a pivot table (team,project)
#     class Meta:
#         db_table = "team_project"
#     team = models.ForeignKey(Team, on_delete=models.CASCADE)
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)

class Device(models.Model):

    class Meta:
        db_table = "device"
    
    name = models.CharField(max_length=50, blank=True, null=True)
    site = models.OneToOneField(Site, on_delete=models.CASCADE, related_name="device")

class Thing(models.Model):
    
    class Meta:
        db_table = "thing"
    
    type = models.CharField(max_length=50)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

class Chart(models.Model):

    class Meta:
        db_table = "chart"

    name = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    x_label = models.CharField(max_length=50, blank=True, null=True)
    y_label = models.CharField(max_length=50, blank=True, null=True)
    x_scale = models.DecimalField(max_digits=2, decimal_places=2)
    y_scale = models.DecimalField(max_digits=2, decimal_places=2)
    x_coordinate = models.DecimalField(max_digits=2, decimal_places=2)
    y_coordinate = models.DecimalField(max_digits=2, decimal_places=2)
    query = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)