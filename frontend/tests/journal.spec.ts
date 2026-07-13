import page from '@/app/page';
import { test, expect } from '@playwright/test';

test.describe('Journal Page', () => {
  test.beforeEach(async ({ page }) => {
    // Change this to your actual route
    await page.goto('/journal');
  });

  test('should load the journal page with correct URL', async ({ page }) => {
    await expect(page).toHaveURL('/journal');
  });

  test('should display hero section', async ({ page }) => {
    await expect(page).toHaveURL('/journal');

    await expect(
      page.getByRole('heading', { name: 'Stories, Scents & Moments.', exact: true })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Thara Bliss Journal', exact: true })
    ).toBeVisible();
  });

  test('should display hero image', async ({ page }) => {
    const heroImage = page.locator(
      'img[alt="Thara Bliss Journal — fragrance atelier"]'
    );

    await expect(heroImage).toBeVisible();
  });

  test('should display featured article', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Why Scent Matters More Than You Think',
      })
    ).toBeVisible();

    await expect(
      page.getByText('Science of Scent')
    ).toBeVisible();
  });

  test('should display all article cards', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'The Art of Slowing Down',
      })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'How to Create a Relaxing Atmosphere at Home',
      })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'Morning Rituals for a Better Day',
      })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'Behind The Brand',
      })
    ).toBeVisible();
  });

  test('should render footer', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Thara Bliss', exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('© 2026 Thara Bliss. All rights reserved.')
    ).toBeVisible();
  });

  test('should contain navigation links in footer', async ({ page }) => {
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

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.reload();

    await expect(
      page.getByRole('heading', {
        name: /Stories,\s*Scents/i,
      })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', {
        name: 'Why Scent Matters More Than You Think',
      })
    ).toBeVisible();
  });

  test('should have images loaded', async ({ page }) => {
    const images = page.locator('img');

    await expect(images).toHaveCount(6);

    const count = await images.count();

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toBeVisible();
    }
  });

  test('should scroll to footer without errors', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(
      page.getByText('© 2026 Thara Bliss. All rights reserved.')
    ).toBeVisible();
  });
});