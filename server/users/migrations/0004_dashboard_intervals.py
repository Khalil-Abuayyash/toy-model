# Generated by Django 4.0.1 on 2022-03-22 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_parameter_remove_chart_project_delete_variable_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dashboard',
            name='intervals',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
