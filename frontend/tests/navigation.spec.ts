import { test, expect } from '@playwright/test';

test('should display navbar links', async ({ page }) => {
  await page.goto('/');
  const navbar = page.locator('nav');

  await expect(navbar).toBeVisible();

  // Scoped to the desktop nav's real class, since the mobile menu
  // renders a second "Home" link with no class in the same <nav>.
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Home' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Products' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Journal' })).toBeVisible();
  await expect(navbar.locator('a.thara-nav-link', { hasText: 'Help Center' })).toBeVisible();
});