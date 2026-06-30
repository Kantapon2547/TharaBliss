# products/urls.py
from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, SiteSettingsView, AnnouncementListView

urlpatterns = [
    path("products/", ProductListAPIView.as_view()),
    path("products/<int:pk>/", ProductDetailAPIView.as_view()),
    path("site-settings/", SiteSettingsView.as_view()),
    path("announcements/", AnnouncementListView.as_view()),
]