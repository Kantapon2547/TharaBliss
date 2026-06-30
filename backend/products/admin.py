from django.contrib import admin, messages  
from .models import Product, Category, SiteSettings, ProductAnnouncement
from adminsortable2.admin import SortableAdminMixin


class ProductAnnouncementAdmin(admin.ModelAdmin):
    list_display = ['product', 'message', 'created_at', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['product__name', 'message']
    list_editable = ['is_active']
    ordering = ['-created_at']

admin.site.register(ProductAnnouncement, ProductAnnouncementAdmin)


@admin.action(description="📣 Send announcement for selected products")
def send_announcement(modeladmin, request, queryset):
    created = 0
    for product in queryset:
        ProductAnnouncement.objects.create(
            product=product,
            message="✨ สินค้าใหม่มาแล้ว! มาดูกัน 👉",
        )
        created += 1
    messages.success(request, f"✅ สร้างประกาศสำเร็จ {created} รายการ")


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

    actions = [send_announcement]

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
