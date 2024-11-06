import { test, expect } from "@playwright/test";

test.describe("Orders Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    await page.waitForURL("/");
    await page.goto("/dashboard/orders");
  });

  test("should update Order status successfully", async ({ page }) => {
    await page.getByLabel("Order status").click();
    await page
      .getByRole("option", { name: "PREPARING" })
      .getByRole("radio")
      .click();

    await expect(
      page.getByText("Order status updated successfully")
    ).toBeVisible();
  });

  test("should show order details successfully", async ({ page }) => {
    await page.waitForTimeout(2000);
    await page
      .getByRole("row", { name: "test 2 Toppings 1 0987654321" })
      .locator("div")
      .first()
      .click();

    await expect(page.getByText("Order Details")).toBeVisible();
  });

  test("should search for order successfully", async ({ page }) => {
    await page.getByLabel("Show/Hide search").click();
    await page.getByPlaceholder("Search").fill("test");

    await page.waitForTimeout(2000);

    await expect(page.locator("tbody")).toContainText("test");
  });

  test("should filter orders by pizza name successfully", async ({ page }) => {
    await page.getByLabel("Show/Hide filters").click();
    await page.getByPlaceholder("Filter by Pizza").fill("test");
    await page.waitForTimeout(2000);

    await expect(page.locator("tbody")).toContainText("test");
  });
});
