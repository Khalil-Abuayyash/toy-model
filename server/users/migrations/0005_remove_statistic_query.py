# Generated by Django 4.0.1 on 2022-03-22 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_dashboard_intervals'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statistic',
            name='query',
        ),
    ]
