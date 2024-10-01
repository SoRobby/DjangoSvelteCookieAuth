from apps.core.utils import AdminExportMixin
from django.contrib import admin

from .models import Country


# Admin objects
@admin.register(Country)
class CountryAdmin(admin.ModelAdmin, AdminExportMixin):
    list_display = ['__str__', 'slug', 'iso_code_alpha3', 'date_created', 'date_modified']

    list_filter = []

    filter_horizontal = []

    search_fields = ['name', 'slug', 'iso_code_alpha2', 'iso_code_alpha3']

    autocomplete_fields = []

    prepopulated_fields = {'slug': ['name']}

    actions = [AdminExportMixin.export_as_csv, AdminExportMixin.export_as_json, AdminExportMixin.export_as_text]

    readonly_fields = ['id', 'uuid', 'date_created', 'date_modified']

    fieldsets = [
        ('Country', {
            'fields': ['name', 'slug'],
            'description': 'Primary country fields and properties'
        }),
        ('ISO codes', {
            'fields': ['iso_code_alpha2', 'iso_code_alpha3'],
            'description': 'ISO codes for country identification'
        }),
        ('Ready-only properties', {
            'fields': ['id', 'uuid', 'date_created', 'date_modified'],
            'description': 'System-generated fields that are crucial for data integrity and are not editable'
        }),
        ('Notes', {
            'fields': [],
            'description': '''
                <b>References:</b><br>
                - Country ISO codes: https://www.iso.org/obp/ui<br>
            '''
        })
    ]

