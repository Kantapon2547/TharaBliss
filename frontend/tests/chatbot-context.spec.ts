import { test, expect } from "@playwright/test";

test.describe("Chatbot Context and Product Pages", () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations/transitions
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

  test("should answer product-specific questions and mention price on a product page", async ({ page }) => {
    test.setTimeout(120000); // LLM can be slow to respond on first token

    // Go to product ID 2 (AROMA BALM (Poised Pear & Freesia))
    await page.goto("/products/2", { waitUntil: "domcontentloaded" });

    // Open chat
    const openBtn = page.getByRole("button", { name: "Open chat" });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Type a message about price / "how much is this?"
    const input = page.locator(".cs-message-input__content-editor");
    await expect(input).toBeVisible();
    await input.fill("How much is this?");
    await page.keyboard.press("Enter");

    // Wait for the bot response to appear and verify it contains product info
    // We expect the LLM to process and answer.
    const botMessageLocator = page.locator(".cs-message--incoming").last();
    
    // We wait up to 80 seconds for the response to not be "กำลังพิมพ์..." (typing)
    await expect(botMessageLocator).not.toHaveText("กำลังพิมพ์...", { timeout: 80000 });
    
    const botText = await botMessageLocator.innerText();
    console.log("Bot reply to 'How much is this?':", botText);
    
    // It should contain "105" (the price of Poised Pear & Freesia is 105.00)
    // or mention "Poised Pear & Freesia"
    const lowerText = botText.toLowerCase();
    const hasPriceOrName = lowerText.includes("105") || lowerText.includes("pear") || lowerText.includes("freesia") || lowerText.includes("poised");
    expect(hasPriceOrName).toBe(true);
  });

  test("should answer questions about upcoming products", async ({ page }) => {
    test.setTimeout(120000);

    await page.goto("/");

    // Open chat
    const openBtn = page.getByRole("button", { name: "Open chat" });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Type a message about upcoming soon products
    const input = page.locator(".cs-message-input__content-editor");
    await expect(input).toBeVisible();
    await input.fill("Are there any upcoming products?");
    await page.keyboard.press("Enter");

    const botMessageLocator = page.locator(".cs-message--incoming").last();
    await expect(botMessageLocator).not.toHaveText("กำลังพิมพ์...", { timeout: 80000 });

    const botText = await botMessageLocator.innerText();
    console.log("Bot reply to 'Are there any upcoming products?':", botText);

    // It should mention "Room Spray" or "Special Gift" or "coming soon" / "soon"
    const lowerText = botText.toLowerCase();
    const mentionsUpcoming =
      lowerText.includes("spray") ||
      lowerText.includes("gift") ||
      lowerText.includes("soon") ||
      lowerText.includes("สเปรย์") ||
      lowerText.includes("ของขวัญ") ||
      lowerText.includes("เร็วๆ นี้");
    expect(mentionsUpcoming).toBe(true);
  });
});
