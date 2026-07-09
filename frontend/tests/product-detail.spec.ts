import { test, expect } from "@playwright/test";

test.describe("Product detail page", () => {
  let productId: string | null = null;

  test.describe("with valid product", () => {
    test.beforeEach(async ({ page }) => {
      // Scrape the first valid product ID from the collection catalog
      if (!productId) {
        await page.goto("/products");
        const link = page.getByRole("link", { name: "View Details" }).first();
        await link.waitFor({ state: "attached" });
        const href = await link.getAttribute("href");
        if (href) {
          const match = href.match(/\/products\/(\d+)/);
          if (match) {
            productId = match[1];
          }
        }
      }
      
      const idToUse = productId || "1";
      await page.goto(`/products/${idToUse}`);
    });

    test("should display product detail", async ({ page }) => {
      await expect(page.locator("h1")).toBeVisible(); 

      await expect(
        page.getByText("Collection")
      ).toBeVisible();

      // Product name
      await expect(
        page.locator("h1")
      ).toBeVisible();

      // Category
      await expect(
         page.getByRole("heading", { name: /AROMA BALM/i })
      ).toBeVisible();

      // Description
      await expect(
        page.locator("p").filter({
          hasText: /./
        }).first()
      ).toBeVisible();
    });

    test("should show scent information", async ({ page }) => {
      await expect(
        page.getByText("Scent")
      ).toBeVisible();
    });

    test("should display size selector and price", async ({ page }) => {
      // ProductSizeAndPrice component
      await expect(
        page.getByText(/฿/)
      ).toBeVisible();
    });

    test("user can open product information accordion", async ({ page }) => {
      // depends on your ProductAccordions text
      const accordion = page.getByText(
        /How to Use|วิธีใช้/i
      );

      await expect(accordion).toBeVisible();
      await accordion.click();
    });

    test("should show Shopee/TikTok purchase buttons", async ({ page }) => {
      const shopee = page.getByRole("button", {
          name: "Buy on Shopee",
      });
      
      const tiktok = page.getByRole("button", {
          name: "Buy on TikTok Shop",
      });
      
      await expect(
          shopee.or(tiktok).first()
      ).toBeVisible();
    });
  });

  test("invalid product should show not found", async ({ page }) => {

    await page.goto("/products/not-exist");

    await expect(
      page.getByText("Product not found")
    ).toBeVisible();

    await expect(
      page.getByText("Back to collection")
    ).toBeVisible();
    
  });

});
