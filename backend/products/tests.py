from django.test import TestCase
from .models import Product, Category, SiteSettings


class ProductAPITest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Aroma Balm"
        )

        self.product = Product.objects.create(
            name="Thara Mist",
            price=299,
            scent="Thara Mist",
            category=self.category,
            is_active=True,
        )

        Product.objects.create(
            name="Hidden",
            price=99,
            scent="Aqua No.1",
            is_active=False,
        )

        SiteSettings.objects.create(
            shopee_regular_url="https://shorturl.at/2Eg4w",
            shopee_set_url="https://shorturl.at/B5ucX",
            tiktok_url="https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe",
        )

    def test_only_active_products_returned(self):
        res = self.client.get("/api/products/")

        self.assertEqual(res.status_code, 200)

        data = res.json()

        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["name"], "Thara Mist")

    def test_inactive_product_not_returned(self):
        inactive_product = Product.objects.create(
            name="Hidden Product",
            price=99,
            scent="Aqua No.1",
            is_active=False,
        )

        res = self.client.get(f"/api/products/{inactive_product.id}/")

        self.assertEqual(res.status_code, 404)

    def test_product_detail_endpoint(self):
        res = self.client.get(f"/api/products/{self.product.id}/")

        self.assertEqual(res.status_code, 200)

        data = res.json()

        self.assertEqual(data["name"], "Thara Mist")
        self.assertEqual(data["scent"], "Thara Mist")

    def test_site_settings_endpoint(self):
        res = self.client.get("/api/site-settings/")

        self.assertEqual(res.status_code, 200)

        data = res.json()

        self.assertEqual(
            data["shopee_regular_url"],
            "https://shorturl.at/2Eg4w"
        )

        self.assertEqual(
            data["shopee_set_url"],
            "https://shorturl.at/B5ucX"
        )

        self.assertEqual(
            data["tiktok_url"],
            "https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe"
        )

    def test_site_settings_no_500_when_empty(self):
        SiteSettings.objects.all().delete()

        res = self.client.get("/api/site-settings/")

        self.assertIn(res.status_code, [200, 404])

    def test_site_settings_returns_empty_when_missing(self):
        SiteSettings.objects.all().delete()

        res = self.client.get("/api/site-settings/")

        self.assertEqual(res.status_code, 200)

        data = res.json()

        self.assertEqual(data["shopee_regular_url"], "")
        self.assertEqual(data["shopee_set_url"], "")
        self.assertEqual(data["tiktok_url"], "")

    def test_product_images_field_exists(self):
        product = Product.objects.filter(is_active=True).first()

        res = self.client.get(f"/api/products/{product.id}/")

        self.assertEqual(res.status_code, 200)

        data = res.json()

        self.assertIn("image", data)
