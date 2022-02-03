from django.contrib import admin
from users.models import User
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'nickname', )
    list_filter = ('email', 'nickname', 'is_active', 'is_staff')
    ordering = ('-created_at',)
    list_display = ('email', 'nickname', 'id',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'nickname',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        # ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nickname', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)