from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    SCENT_CHOICES = [
        ('Thara Mist', 'Thara Mist'),
        ('Poised Pear & Freesia', 'Poised Pear & Freesia'),
        ('Aqua No.1', 'Aqua No.1'),
        ('Box Set', 'Box Set'),
        ('Trio Set', 'Trio Set')
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )

    order = models.PositiveIntegerField(default=0,
    db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    scent = models.CharField(max_length=100, choices=SCENT_CHOICES)

    image = models.ImageField(
        upload_to='aroma_balm/',
        null=True,
        blank=True
    )

    is_active = models.BooleanField(default=True)
    is_set_product = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.name


class SiteSettings(models.Model):
    shopee_regular_url = models.URLField(blank=True, null=True)
    shopee_set_url = models.URLField(blank=True, null=True)

    tiktok_url = models.URLField(blank=True, null=True)
    thaimart_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return "Site Settings"


class ProductAnnouncement(models.Model):
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='announcements'
    )
    message = models.CharField(
        max_length=300,
        default="✨ สินค้าใหม่มาแล้ว! มาดูกัน 👉"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Product Announcement"
        verbose_name_plural = "Product Announcements"

    def __str__(self):
        return f"{self.product.name} — {self.created_at:%Y-%m-%d %H:%M}"