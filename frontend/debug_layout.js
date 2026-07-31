const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to admin...");
    await page.goto('http://127.0.0.1:8000/admin/');
    await page.waitForTimeout(2000);
    
    // Check if we are on login page
    const loginInput = page.locator('#id_username');
    if (await loginInput.count() > 0) {
      console.log("On login page, logging in...");
      await loginInput.fill('admin');
      await page.fill('#id_password', 'admin1234');
      await page.click('input[type="submit"]');
      await page.waitForURL('**/admin/**');
    } else {
      console.log("Already logged in or on dashboard.");
    }
    
    console.log("Navigating to Categories add page...");
    await page.goto('http://127.0.0.1:8000/admin/products/category/add/');
    await page.waitForTimeout(2000);
    
    // Take a screenshot and save to artifacts folder
    const screenshotPath = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\5c26e0f3-6984-4e15-bafb-dd27cd2ce103\\admin_layout_local.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log("Screenshot saved to:", screenshotPath);
    
    // Get computed styles and layout information
    const styles = await page.evaluate(() => {
      const sidebar = document.querySelector('.main-sidebar');
      const wrapper = document.querySelector('.content-wrapper');
      const body = document.body;
      const row = document.querySelector('.row');
      const firstCol = row ? row.children[0] : null;
      const secondCol = row ? row.children[1] : null;
      
      const getStyles = (el) => {
        if (!el) return null;
        const s = window.getComputedStyle(el);
        return {
          tagName: el.tagName,
          className: el.className,
          display: s.display,
          position: s.position,
          width: s.width,
          height: s.height,
          marginLeft: s.marginLeft,
          marginRight: s.marginRight,
          paddingLeft: s.paddingLeft,
          paddingRight: s.paddingRight,
          left: s.left,
          right: s.right,
          flex: s.flex,
          float: s.float,
          boxSizing: s.boxSizing
        };
      };
      
      return {
        sidebar: getStyles(sidebar),
        wrapper: getStyles(wrapper),
        body: getStyles(body),
        row: getStyles(row),
        firstCol: getStyles(firstCol),
        secondCol: getStyles(secondCol)
      };
    });
    
    console.log("RESULT_START");
    console.log(JSON.stringify(styles, null, 2));
    console.log("RESULT_END");
  } catch (err) {
    console.error("Error during execution:", err);
  } finally {
    await browser.close();
  }
})();
