import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("should load hero section with welcome texts and buttons", async ({ page }) => {
    // Assert welcome tagline
    await expect(page.getByText("Welcome to Thara Bliss")).toBeVisible();

    // Assert main header
    await expect(
      page.getByRole("heading", { name: /Find Your.*Signature.*Scent/i })
    ).toBeVisible();

    // Assert primary call-to-action buttons
    const exploreBtn = page.getByRole("link", { name: "Explore Scents" });
    const servicesBtn = page.getByRole("link", { name: "Our Services" });

    await expect(exploreBtn).toBeVisible();
    await expect(servicesBtn).toBeVisible();
  });

  test("should display key promise sections", async ({ page }) => {
    // Assert our core values/services promise cards are loaded
    await expect(page.getByText("Our Promise")).toBeVisible();
    await expect(page.getByText("Designed to Be Picked Up")).toBeVisible();
    await expect(page.getByText("Created for Everyday Moments")).toBeVisible();
  });

  test("should display stats figures", async ({ page }) => {
    // Assert statistical highlights
    await expect(page.getByText("3 Scent Collections")).toBeVisible();
    await expect(page.getByText("100% Thai Crafted")).toBeVisible();
    await expect(page.getByText("FDA Certified")).toBeVisible();
  });

  test("should display themed collections", async ({ page }) => {
    // Assert scent collection headings
    await expect(page.getByText("Calm Rituals", { exact: true })).toBeVisible();
    await expect(page.getByText("Modern Elegance", { exact: true })).toBeVisible();
    await expect(page.getByText("Warm Impressions", { exact: true })).toBeVisible();
  });

  test("should show top navbar and footer details", async ({ page }) => {
    // Verify header navbar is present
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();

    // Verify footer is present
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});