import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should load the page with correct URL", async ({ page }) => {
    await expect(page).toHaveURL("/about");
  });

  test("should display hero section with heading and tagline", async ({ page }) => {
    // Eyebrow tagline
    await expect(page.getByText("About Thara Bliss")).toBeVisible();

    // Main hero heading
    await expect(
      page.getByRole("heading", { name: /Inspired By Scent/i })
    ).toBeVisible();

    // Hero subtitle
    await expect(
      page.getByText("Creating small moments of calm, balance, and happiness through the power of fragrance.")
    ).toBeVisible();
  });

  test("should display Our Story section", async ({ page }) => {
    // Scope to main to avoid navbar links also matching "Our Story"
    await expect(page.locator("main").getByText("Our Story", { exact: true })).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /extraordinary power of ordinary moments/i })
    ).toBeVisible();
  });

  test("should display The Power of Scent section", async ({ page }) => {
    await expect(page.getByText("The Power of Scent")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /invisible language felt through emotion/i })
    ).toBeVisible();
  });

  test("should display Our Philosophy section with three pillars", async ({ page }) => {
    await expect(page.getByText("Our Philosophy")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Three pillars, one intention/i })
    ).toBeVisible();

    // Three philosophy pillar cards — exact: true avoids matching "Thara Bliss" or hero headings
    await expect(page.getByRole("heading", { name: "Calm", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Balance", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Bliss", exact: true })).toBeVisible();
  });

  test("should display Our Craft section", async ({ page }) => {
    await expect(page.locator("main").getByText("Our Craft", { exact: true })).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Every detail, every note, every texture/i })
    ).toBeVisible();
  });

  test("should display Looking Ahead section", async ({ page }) => {
    await expect(page.getByText("Looking Ahead")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /From your pocket to every corner of your home/i })
    ).toBeVisible();
  });

  test("should display footer with navigation links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Footer brand name
    await expect(footer.getByRole("heading", { name: "Thara Bliss" })).toBeVisible();

    // Footer links
    await expect(footer.getByRole("link", { name: "Products" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "About" })).toBeVisible();

    // Copyright notice
    await expect(footer.getByText(/© 2026 Thara Bliss/)).toBeVisible();
    await expect(footer.getByText("Calm. Balance. Bliss.")).toBeVisible();
  });
});