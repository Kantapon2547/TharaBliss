import { test, expect } from '@playwright/test';

test('should display navbar links', async ({ page }) => {
  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });

  const navbar = page.locator('nav');

  // Homepage content (nav included) may render after client-side
  // hydration/data fetch finishes — give this first assertion room,
  // subsequent ones will be fast since the page is already settled.
  await expect(navbar).toBeVisible({ timeout: 15000 });

  // Scoped to the desktop nav's real class, since the mobile menu
  // renders a second "Home" link with no class in the same <nav>.
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Home' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Products' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Journal' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Help Center' })).toBeVisible();
});