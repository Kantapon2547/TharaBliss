import { test, expect } from '@playwright/test';

test.describe('Help Center Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/help-center');
  });

  test('should load the page with correct URL', async ({ page }) => {
    await expect(page).toHaveURL('/help-center');
  });

  test('should display hero section', async ({ page }) => {
    // "ศูนย์" / "ช่วยเหลือ" live inside an <h1>, split by a <br/> and an <em> —
    // regex handles the whitespace between them.
    await expect(
      page.getByRole('heading', { name: /ศูนย์.*ช่วยเหลือ/ })
    ).toBeVisible();

    // This is a <p>, not a heading — getByRole('heading', ...) can never
    // match it. Use getByText instead.
    await expect(page.getByText('Customer Care', { exact: true })).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await expect(
      page.getByText('© 2026 Thara Bliss. All rights reserved.')
    ).toBeVisible();
  });

  test('should contain navigation links in footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    await expect(footer.getByRole('heading', { name: 'Thara Bliss' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(footer.getByText(/© 2026 Thara Bliss/)).toBeVisible();
    await expect(footer.getByText('Calm. Balance. Bliss.')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveURL('/help-center');
  });

  test('should display scent quiz', async ({ page }) => {
    await expect(page.getByText('Scent Finder Quiz')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' })
    ).toBeVisible();
  });

  test('should start the quiz', async ({ page }) => {
    await page.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' }).click();
    await expect(page.getByText('คำถามที่ 1')).toBeVisible();
  });

  test('should finish the scent quiz', async ({ page }) => {
    // Scoped to the existing section.scent-section class rather than a
    // data-testid, so no component edit is required. The only <button>
    // elements inside this section belong to the quiz — the SCENT_GUIDE
    // cards below it are plain divs with no buttons — so this stays a
    // safe, stable anchor across every quiz step.
    const quiz = page.locator('section.scent-section');

    await quiz.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' }).click();

    await expect(page.getByText(/คำถามที่ 1 จาก 3/)).toBeVisible();
    await quiz.getByRole('button').first().click({ force: true });

    await expect(page.getByText(/คำถามที่ 2 จาก 3/)).toBeVisible();
    await quiz.getByRole('button').first().click({ force: true });

    await expect(page.getByText(/คำถามที่ 3 จาก 3/)).toBeVisible();
    await quiz.getByRole('button').first().click({ force: true });

    await expect(page.getByText('Your Perfect Match')).toBeVisible();
    await expect(
      quiz.getByRole('button', { name: 'ทำแบบทดสอบใหม่' })
    ).toBeVisible();
  });

  test('should restart quiz', async ({ page }) => {
    const quiz = page.locator('section.scent-section');

    await quiz.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' }).click();

    for (let i = 0; i < 3; i++) {
      await quiz.getByRole('button').first().click({ force: true });
    }

    await expect(page.getByText('Your Perfect Match')).toBeVisible();

    await quiz.getByRole('button', { name: 'ทำแบบทดสอบใหม่' }).click();

    await expect(
      quiz.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' })
    ).toBeVisible();
  });

  test('result page should contain product link', async ({ page }) => {
    const quiz = page.locator('section.scent-section');

    await quiz.getByRole('button', { name: 'เริ่มทำแบบทดสอบ' }).click();

    for (let i = 0; i < 3; i++) {
      await quiz.getByRole('button').first().click({ force: true });
    }

    await expect(page.getByText('Your Perfect Match')).toBeVisible();

    await expect(
      quiz.getByRole('link', { name: 'ดูสินค้าทั้งหมด' })
    ).toHaveAttribute('href', '/products');
  });
});