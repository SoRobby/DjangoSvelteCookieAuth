# Register your models here.
from apps.accounts.models import Account
from apps.core.utils import AdminExportMixin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


# Admin objects
@admin.register(Account)
class AccountAdmin(UserAdmin, AdminExportMixin):
    list_display = ['email', 'username', 'is_staff', 'is_admin', 'is_superuser', 'date_created', 'date_last_logged_in']

    list_filter = ['is_admin', 'is_staff']

    filter_horizontal = []

    search_fields = ['email', 'username']

    autocomplete_fields = ['country']

    actions = [AdminExportMixin.export_as_csv, AdminExportMixin.export_as_json, AdminExportMixin.export_as_text]

    readonly_fields = ['id', 'date_last_logged_in', 'date_created']

    fieldsets = [
        ('Identity', {
            'fields': ['email', 'username', 'first_name', 'last_name', 'country'],
            'description': 'General account information'
        }),
        ('Details', {
            'fields': ['bio'],
            'description': 'Account specific details'
        }),
        ('Admin properties', {
            'fields': ['is_active', 'is_staff', 'is_admin', 'is_superuser'],
            'description': 'Fields related to the property tag'
        }),
        ('Ready-only properties', {
            'fields': ['id', 'date_created', 'date_last_logged_in'],
            'description': 'System-generated fields that are crucial for data integrity and are not editable'
        }),
        ('Notes', {
            'fields': [],
            'description': '''
                <b>Additional properties:</b><br>
                - full_name: Returns the full name of the user (first_name + last_name)<br>
            '''
        })
    ]

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )

