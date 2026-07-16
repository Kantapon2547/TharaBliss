import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
      }
    `,
  });
});

test("should display chatbot launcher", async ({ page }) => {
  await expect(
    page.getByRole("button", { name: "Open chat" })
  ).toBeVisible();
});

test("should open chatbot", async ({ page }) => {
  await page.getByRole("button", { name: "Open chat" }).click();

  await expect(page.getByText("Thara Bliss 🌿")).toBeVisible();

  await expect(
    page.getByText("สวัสดีค่ะ! 👋")
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Close" })
  ).toBeVisible();

  await page.pause();
});

test("should send a message", async ({ page }) => {
  await page.getByRole("button", { name: "Open chat" }).click();

  const input = page.locator(".cs-message-input__content-editor");
  await expect(input).toBeVisible();
  await input.fill("Hello");

  await page.keyboard.press("Enter");

  await expect(page.getByText("Hello")).toBeVisible();
});