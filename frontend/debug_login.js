const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://127.0.0.1:8000/admin/');
    await page.waitForTimeout(2000);
    
    console.log("URL:", page.url());
    console.log("Title:", await page.title());
    
    const content = await page.content();
    console.log("Has username text:", content.includes('username') || content.includes('Username'));
    console.log("Has id_username:", content.includes('id_username'));
    
    // Find all input elements
    const inputs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        className: input.className
      }));
    });
    console.log("Inputs on page:", inputs);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
