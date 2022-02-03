# Generated by Django 4.0.1 on 2022-02-02 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_project_brand_project_note_project_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='capacity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='voltage_level',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='site',
            name='capacity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
