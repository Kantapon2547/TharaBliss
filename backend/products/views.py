from rest_framework import generics
from .models import Product, SiteSettings, ProductAnnouncement
from .serializers import ProductSerializer, SiteSettingsSerializer, ProductAnnouncementSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

class AnnouncementListView(ListAPIView):
    serializer_class = ProductAnnouncementSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ProductAnnouncement.objects.filter(is_active=True).select_related('product')[:3]


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer

    def get_object(self):
        return SiteSettings.objects.first()
