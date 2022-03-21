# Generated by Django 4.0.1 on 2022-03-13 12:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import timescale.db.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('nickname', models.CharField(max_length=150, unique=True)),
                ('telephone', models.CharField(blank=True, max_length=15)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='Dashboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('type', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'dashboard',
            },
        ),
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'device',
            },
        ),
        migrations.CreateModel(
            name='Metric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', timescale.db.models.fields.TimescaleDateTimeField(interval='1 day')),
                ('temperature', models.FloatField()),
            ],
            options={
                'db_table': 'metric',
            },
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('timezone', models.CharField(max_length=50)),
                ('theme', models.CharField(max_length=50)),
                ('disco', models.CharField(max_length=50)),
                ('note', models.TextField()),
            ],
            options={
                'db_table': 'orgaznization',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('voltage_level', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('capacity', models.IntegerField()),
                ('brand', models.CharField(max_length=50)),
                ('note', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'project',
            },
        ),
        migrations.CreateModel(
            name='Query',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'query',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'db_table': 'role',
            },
        ),
        migrations.CreateModel(
            name='Site',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('note', models.TextField()),
                ('disco', models.CharField(max_length=50)),
                ('lng', models.DecimalField(decimal_places=2, max_digits=4)),
                ('lat', models.DecimalField(decimal_places=2, max_digits=4)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sites', to='users.organization')),
            ],
            options={
                'db_table': 'site',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('description', models.TextField()),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams', to='users.organization')),
            ],
            options={
                'db_table': 'team',
            },
        ),
        migrations.CreateModel(
            name='Variable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'variable',
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('done', models.BooleanField(default=False)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.organization')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.project')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.site')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'ticket',
            },
        ),
        migrations.CreateModel(
            name='Thing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hardware_id', models.CharField(max_length=50, unique=True)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('status', models.BooleanField(default=True)),
                ('type', models.CharField(max_length=50)),
                ('device', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='things', to='users.device')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='things', to='users.project')),
            ],
            options={
                'db_table': 'thing',
            },
        ),
        migrations.CreateModel(
            name='TeamSite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.site')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.team')),
            ],
            options={
                'db_table': 'team_site',
            },
        ),
        migrations.CreateModel(
            name='TeamMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.team')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'team_membership',
            },
        ),
        migrations.AddField(
            model_name='team',
            name='users',
            field=models.ManyToManyField(related_name='teams', through='users.TeamMembership', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Statistic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('type', models.CharField(blank=True, max_length=50, null=True)),
                ('x_coordinate', models.IntegerField()),
                ('y_coordinate', models.IntegerField()),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('query', models.TextField()),
                ('dashboard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='statistics', to='users.dashboard')),
            ],
            options={
                'db_table': 'statistic',
            },
        ),
        migrations.AddField(
            model_name='site',
            name='teams',
            field=models.ManyToManyField(related_name='sites', through='users.TeamSite', to='users.Team'),
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('browser', models.CharField(blank=True, max_length=50, null=True)),
                ('os', models.CharField(blank=True, max_length=50, null=True)),
                ('ip', models.CharField(blank=True, max_length=23, null=True)),
                ('logged_on', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'session',
            },
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emails', models.TextField()),
                ('dashboard', models.TextField()),
                ('delivery_time', models.CharField(blank=True, max_length=50, null=True)),
                ('period', models.CharField(blank=True, max_length=10, null=True)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.organization')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.site')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'report',
            },
        ),
        migrations.AddField(
            model_name='project',
            name='site',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to='users.site'),
        ),
        migrations.CreateModel(
            name='OrganizationMembership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_org_admin', models.BooleanField()),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.organization')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'organization_membership',
            },
        ),
        migrations.AddField(
            model_name='organization',
            name='users',
            field=models.ManyToManyField(related_name='organizations', through='users.OrganizationMembership', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('time', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'log',
            },
        ),
        migrations.AddField(
            model_name='device',
            name='site',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='device', to='users.site'),
        ),
        migrations.AddField(
            model_name='dashboard',
            name='site',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dashboards', to='users.site'),
        ),
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('type', models.CharField(blank=True, max_length=50, null=True)),
                ('x_label', models.CharField(blank=True, max_length=50, null=True)),
                ('y_label', models.CharField(blank=True, max_length=50, null=True)),
                ('x_scale', models.DecimalField(decimal_places=2, max_digits=2)),
                ('y_scale', models.DecimalField(decimal_places=2, max_digits=2)),
                ('x_coordinate', models.DecimalField(decimal_places=2, max_digits=2)),
                ('y_coordinate', models.DecimalField(decimal_places=2, max_digits=2)),
                ('query', models.TextField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.project')),
            ],
            options={
                'db_table': 'chart',
            },
        ),
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('emails', models.TextField()),
                ('description', models.TextField()),
                ('query', models.TextField()),
                ('dashboard', models.TextField()),
                ('operation', models.CharField(blank=True, max_length=50, null=True)),
                ('value', models.DecimalField(decimal_places=2, max_digits=4)),
                ('period', models.CharField(blank=True, max_length=3, null=True)),
                ('organization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.organization')),
                ('site', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.site')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'alert',
            },
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='users', to='users.role'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
