from django.contrib import admin
from .models import Product, Category, SiteSettings
from adminsortable2.admin import SortableAdminMixin


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = (
        'name',
        'scent',
        'price',
        'order',
        'is_active',
    )

    list_filter = (
        'scent',
        'is_active',
    )

    search_fields = (
        'name',
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )

    search_fields = (
        'name',
    )


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    pass
