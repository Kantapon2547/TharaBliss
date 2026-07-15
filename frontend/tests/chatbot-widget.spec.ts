import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  // The chat widget's open/close panel animates in (slide/fade).
  // Playwright's click requires the target's bounding box to be stable
  // across frames, and the "Close" button lives inside that animating
  // panel — disabling transitions removes the race instead of masking
  // it with a fixed wait.
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

test("should close chatbot", async ({ page }) => {
  await page.getByRole("button", { name: "Open chat" }).click();

  // Scope to the chat header specifically, in case the floating
  // launcher button also exposes a "Close" accessible name while open
  const header = page.locator(".thara-chat-header-btn").locator("..");
  const closeButton = header.getByRole("button", { name: "Close" });

  await expect(closeButton).toBeVisible();
  await closeButton.click();

  await expect(closeButton).toHaveCount(0);
});

test("should send a message", async ({ page }) => {
  await page.getByRole("button", { name: "Open chat" }).click();

  await page.getByPlaceholder("พิมพ์คำถามของคุณที่นี่...")
    .fill("Hello");

  await page.keyboard.press("Enter");

  await expect(page.getByText("Hello")).toBeVisible();
});