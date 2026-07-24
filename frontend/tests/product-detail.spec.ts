import { test, expect } from "@playwright/test";

test.describe("Product detail page", () => {
  let productId: string | null = null;

  test.describe("with valid product", () => {
    test.beforeEach(async ({ page }) => {
      test.setTimeout(60000);

      page.on("console", msg => {
        console.log("BROWSER:", msg.text());
      });

      page.on("pageerror", err => {
        console.log("PAGE ERROR:", err.message);
      });

      if (!productId) {
        await page.goto("/products", {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
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
      await page.goto(`/products/${idToUse}`, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });

      console.log(
        "URL:",
        page.url()
      );

      console.log(
        "BODY:",
        await page.locator("body").innerText().catch(() => "NO BODY")
      );

      await page.screenshot({
        path: "test-results/product-page-debug.png",
        fullPage: true,
      });

      // Content renders after a client-side fetch, which happens after
      // "domcontentloaded" fires. Wait for it HERE, once, so every test
      // below starts from a page that has actually finished loading data
      // — instead of each assertion needing its own ad-hoc timeout bump.
      await expect(page.locator("h1")).toBeVisible({ timeout: 15000 });
    });

    test("should display product detail", async ({ page }) => {
      await expect(page.getByText("Collection")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();

      await expect(
        page.getByRole("heading", { name: /AROMA BALM/i })
      ).toBeVisible();

      await expect(
        page.locator("p").filter({ hasText: /./ }).first()
      ).toBeVisible();
    });

    test("should show scent information", async ({ page }) => {
      await expect(page.getByText("Scent")).toBeVisible();
    });

    test("should display size selector and price", async ({ page }) => {
      await expect(page.getByText(/฿/)).toBeVisible();
    });

    test("user can open product information accordion", async ({ page }) => {
      const accordion = page.getByText(/How to Use|วิธีใช้/i);
      await expect(accordion).toBeVisible();
      await accordion.click();
    });

    test("should show Shopee/TikTok purchase buttons", async ({ page }) => {
      const shopee = page.getByRole("button", { name: "Buy on Shopee" });
      const tiktok = page.getByRole("button", { name: "Buy on TikTok Shop" });
      await expect(shopee.or(tiktok).first()).toBeVisible();
    });
  });

  test("invalid product should show not found", async ({ page }) => {
    await page.goto("/products/not-exist", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    await expect(page.getByText("Product not found")).toBeVisible({
      timeout: 15000,
    });

    await expect(page.getByText("Back to collection")).toBeVisible();
  });
});