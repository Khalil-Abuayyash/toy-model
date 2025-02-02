from cProfile import label
from ipaddress import ip_address
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from timescale.db.models.models import TimescaleModel

class Role(models.Model):

    class Meta:
        db_table = "role"
    
    name = models.CharField(max_length=50, unique=True)

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, nickname, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, nickname, password, role_id=3, **other_fields)

    def create_user(self, email, nickname, password, role_id, **other_fields):
        role = Role.objects.get(id=role_id)
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, nickname=nickname,
                            role=role, **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    # teams:m2m, organizations:m2m

    class Meta:
        db_table = "user"

    email = models.EmailField(_('email address'), unique=True, blank=False, null=False)
    nickname = models.CharField(max_length=150, unique=True, blank=False, null=False)
    # first_name = models.CharField(max_length=150, blank=True)
    # last_name = models.CharField(max_length=150, blank=True)
    telephone = models.CharField(max_length=15, blank=True, unique=False)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    role = models.ForeignKey(Role, related_name="users", on_delete=models.DO_NOTHING)
    is_staff = models.BooleanField(default=False)
    # is_admin = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

class Organization(models.Model):
    # sites:one2many, teams:one2many, users:m2m

    class Meta:
        db_table = "organization"

    name = models.CharField(max_length=50, unique=True, null=False, blank=False)
    timezone = models.CharField(max_length=50)
    theme = models.CharField(max_length=50)
    disco = models.CharField(max_length=50)
    note = models.TextField(blank=False, null=False)
    users = models.ManyToManyField(User, through='OrganizationMembership', related_name='organizations')

class Team(models.Model):
    # sites:m2m, organization:many2one, users:m2m

    class Meta:
        db_table = "team"

    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    users = models.ManyToManyField(User, through='TeamMembership', related_name='teams')
    organization = models.ForeignKey(Organization, related_name='teams', on_delete=models.CASCADE)
    description = models.TextField(blank=False, null=False)

class Site(models.Model):
    # teams:m2m, organizations:many2one

    class Meta:
        db_table = "site"

    teams = models.ManyToManyField(Team, through='TeamSite' ,related_name='sites')
    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='sites')
    note = models.TextField(blank=False, null=False)
    disco = models.CharField(max_length=50)
    # capacity = models.IntegerField()
    lng = models.DecimalField(max_digits=4, decimal_places=2, blank=False, null=False)
    lat = models.DecimalField(max_digits=4, decimal_places=2, blank=False, null=False)

class Dashboard(models.Model):
    class Meta:
        db_table = "dashboard"
    
    name = models.CharField(max_length=50, blank=False, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name='dashboards')
    intervals = models.TextField()

class Statistic(models.Model):
    pallet1 = 'pallet1'
    pallet2 = 'pallet2'
    pallet3 = 'pallet3'
    pallet4 = 'pallet4'
    PALLETS_CHOICES = [
        (pallet1, 'Pallet1'),
        (pallet2, 'Pallet1'),
        (pallet3, 'Pallet1'),
        (pallet4, 'Pallet1'),
    ]

    class Meta:
        db_table = "statistic"
    
    name = models.CharField(max_length=50, blank=True, null=True)
    type = models.CharField(max_length=50, blank=True, null=True)
    x_coordinate = models.IntegerField()
    y_coordinate = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    pallet = models.TextField(
        max_length=7,
        choices=PALLETS_CHOICES,
        default=pallet1,)
    labels = models.TextField(blank=False, null=False)
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, related_name='statistics')

class Parameter(models.Model):
    class Meta:
        db_table = "parameter"
    
    text = models.TextField()
    dashboard = models.ForeignKey(Dashboard, on_delete=models.CASCADE, related_name="parameters")

class Query(models.Model):
    class Meta:
        db_table = "query"
    
    statistic = models.ForeignKey(Statistic, on_delete=models.CASCADE, related_name="queries")
    text = models.TextField(blank=False, null=False)
    column = models.CharField(max_length=50, blank=True, null=True)
    interval = models.CharField(max_length=50, blank=True, null=True)
    function = models.CharField(max_length=50, blank=True, null=True)

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

class Device(models.Model):

    class Meta:
        db_table = "device"
    
    name = models.CharField(max_length=50, blank=True, null=True)
    site = models.OneToOneField(Site, on_delete=models.CASCADE, related_name="device")

class Thing(models.Model):
    
    class Meta:
        db_table = "thing"
    
    hardware_id =  models.CharField(max_length=50, unique=True, blank=False, null=False)
    name = models.CharField(max_length=50, blank=True, null=True)
    status = models.BooleanField(default=True)
    type = models.CharField(max_length=50)
    site = models.ForeignKey(Site, related_name='things', on_delete=models.CASCADE)
    # device = models.ForeignKey(Device, related_name='things', on_delete=models.CASCADE)

class Ticket(models.Model):
    class Meta:
        db_table = "ticket"
    
    title = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)

class Log(models.Model):
    class Meta:
        db_table = "log"
    
    title = models.CharField(max_length=50, blank=False, null=False)
    time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Alert(models.Model):
    class Meta:
        db_table = "alert"
    
    name = models.CharField(max_length=50, blank=True, null=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emails = models.TextField()
    description = models.TextField()
    query = models.TextField()
    dashboard = models.TextField()
    operation = models.CharField(max_length=50, blank=True, null=True)
    value = models.DecimalField(max_digits=4, decimal_places=2)
    period = models.CharField(max_length=3, blank=True, null=True)

class Report(models.Model):
    class Meta:
        db_table  = "report"

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emails = models.TextField()
    dashboard = models.TextField()
    delivery_time =  models.CharField(max_length=50, blank=True, null=True)
    period = models.CharField(max_length=10, blank=True, null=True)

class Session(models.Model):
    class Meta:
        db_table = 'session'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    browser = models.CharField(max_length=50, blank=True, null=True)
    os = models.CharField(max_length=50, blank=True, null=True)
    ip = models.CharField(max_length=23, blank=True, null=True)
    logged_on = models.DateTimeField()

class Metric(TimescaleModel):
   temperature = models.FloatField()

   class Meta:
       db_table = "metric"