import { test, expect } from "@playwright/test";

test.describe("Product page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });


  test("should display hero section", async ({ page }) => {

    await expect(
      page.getByText("Product Collection")
    ).toBeVisible();


    await expect(
      page.getByRole("heading", {
        name: /Find Your.*Signature.*Scent/i
      })
    ).toBeVisible();


    await expect(
      page.getByRole("link", {
        name: "Shop Now"
      })
    ).toBeVisible();

  });


  test("should display certification bar", async ({ page }) => {

    await expect(
      page.getByText("Natural Essence")
    ).toBeVisible();


    await expect(
      page.getByText("Inspired By Nature")
    ).toBeVisible();


    await expect(
      page.getByText("Crafted With Intention")
    ).toBeVisible();

  });


  test("should display product collection section", async ({ page }) => {

    const collection = page.locator("#collection");

    await expect(collection).toBeVisible();


    await expect(
      collection.getByRole("heading", {
        name: "Aroma Balm Series"
      })
    ).toBeVisible();


  });


  test("should show products count", async ({ page }) => {

    const collection = page.locator("#collection");


    await expect(
      collection.getByText(/\d+ products?/i)
    ).toBeVisible();

  });



  test("should scroll to collection when clicking Shop Now", async ({ page }) => {


    await page.getByRole("link", {
      name: "Shop Now"
    }).click();


    await expect(
      page.locator("#collection")
    ).toBeInViewport();

  });



  test("should display brand section", async ({ page }) => {


    await expect(
      page.getByText("Why Thara Bliss")
    ).toBeVisible();


    await expect(
      page.getByText(/More than a balm/i)
    ).toBeVisible();


    await expect(
      page.getByText(/a daily ritual/i)
    ).toBeVisible();

  });



  test("should display CTA section", async ({ page }) => {


    await expect(
      page.getByText("Discover Your Scent")
    ).toBeVisible();


    await expect(
      page.getByText("เลือกกลิ่นที่เป็น")
    ).toBeVisible();


    await expect(
      page.getByRole("link", {
        name:"Browse Collection"
      })
    ).toBeVisible();

  });



  test("should display footer links", async ({ page }) => {


    const footer = page.locator("footer");


    await expect(
      footer.getByText("Products")
    ).toBeVisible();


    await expect(
      footer.getByText("About")
    ).toBeVisible();


    await expect(
      footer.getByText("Journal")
    ).toBeVisible();


    await expect(
      footer.getByText("Help Center")
    ).toBeVisible();


  });

});