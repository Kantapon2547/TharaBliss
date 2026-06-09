# python
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    SCENT_CHOICES = [
        ('Thara Mist', 'Thara Mist'),
        ('Poised Pear & Freesia', 'Poised Pear & Freesia'),
        ('Aqua No.1', 'Aqua No.1'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)
    scent = models.CharField(max_length=100, choices=SCENT_CHOICES)

    image = models.ImageField(upload_to='aroma_balm/', null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
