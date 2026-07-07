import { test, expect } from "@playwright/test";

test("user can submit special gift request", async ({ page }) => {
  await page.goto("/request");

  await page.getByPlaceholder("Your name").fill("John Doe");
  await page.getByPlaceholder("jane@email.com").fill("john@test.com");
  await page.getByPlaceholder("Who's receiving this?").fill("Anna");

  await page.locator("select").selectOption("วันเกิด");

  await page.getByRole("button", {
    name: /Aroma Balm/
  }).click();

  await page.getByRole("button", {
    name: /ต่ำกว่า ฿500/
  }).click({ force: true });

  await page.getByRole("button", {
    name: /สไตล์คลาสสิก/
  }).click({ force: true });

  await page.getByRole("button", {
    name: "ส่งคำขอ"
  }).click({ force: true });

  await expect(
    page.getByText("Request received")
  ).toBeVisible();
});


/* Add validation test here */
test("shows validation errors when form is empty", async ({ page }) => {
  await page.goto("/request");

  await page.getByRole("button", {
    name: "ส่งคำขอ"
  }).click();

  await expect(
    page.getByText("กรุณากรอกชื่อของคุณ")
  ).toBeVisible();

  await expect(
    page.getByText("กรุณากรอกอีเมลของคุณ")
  ).toBeVisible();

  await expect(
    page.getByText("กรุณากรอกชื่อผู้รับของขวัญ")
  ).toBeVisible();

  await expect(
    page.getByText("กรุณาเลือกโอกาสพิเศษ")
  ).toBeVisible();

  await expect(
    page.getByText("กรุณาเลือกอย่างน้อย 1 รายการ")
  ).toBeVisible();

});