import { test, expect } from "@playwright/test";

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    await page.waitForURL("/");
  });

  test("should create order successfully", async ({ page }) => {
    await page
      .locator(
        "div:nth-child(11) > .MuiPaper-root > .MuiCardContent-root > div > div > .MuiButtonBase-root"
      )
      .click();

    await page.waitForURL("/order/cm34ifms90002lhuwjo250are");

    await page.getByLabel("Extra cheese").uncheck();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").nth(1).click();
    await page.getByRole("button").first().click();

    await page.getByRole("button", { name: "Order" }).click();
    await page.waitForTimeout(3000);
    await expect(
      page.getByText("Your order has been successfully completed!")
    ).toBeVisible();
  });

  test("should show order history successfully", async ({ page }) => {
    await page.getByRole("link", { name: "Orders" }).first().click();

    await page.waitForURL("/orders");

    await expect(page.getByText("Playwright Pizza").first()).toBeVisible();
  });
});
