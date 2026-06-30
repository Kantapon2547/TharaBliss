from rest_framework import serializers
from .models import Product, Category, SiteSettings, ProductAnnouncement

class ProductAnnouncementSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_id = serializers.IntegerField(source='product.id', read_only=True)
    product_image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductAnnouncement
        fields = ['id', 'message', 'product_name', 'product_id', 'product_image_url', 'created_at']

    def get_product_image_url(self, obj):
        request = self.context.get('request')
        # adjust 'image' to whatever your Product image field is named
        if obj.product.image and request:
            return request.build_absolute_uri(obj.product.image.url)
        return None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"
