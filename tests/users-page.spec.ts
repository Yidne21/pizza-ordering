import { test, expect } from "@playwright/test";

test.describe("Users Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    await page.waitForURL("/");
    await page.goto("/dashboard/users");
  });

  test("should add a new user successfully", async ({ page }) => {
    await page.getByRole("button", { name: "Add users" }).click();
    await page.getByLabel("Name", { exact: true }).fill("test user");
    await page.getByLabel("Email", { exact: true }).fill("newuser@test.com");
    await page.getByLabel("Location", { exact: true }).fill("Addis Ababa");
    await page.getByLabel("Phone Number").fill("0912345678");
    await page.getByLabel("Password", { exact: true }).fill("123456");
    await page.getByLabel("", { exact: true }).click();
    await page.getByText("kitchenManager").click();
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("User added successfully")).toBeVisible();
  });

  test("should not add a new user when name is empty", async ({ page }) => {
    await page.getByRole("button", { name: "Add User" }).click();
    await page.getByRole("button", { name: "Add" }).click();

    await expect(page.getByText("please enter name")).toBeVisible();
  });

  test("should not add a new user when email is already taken", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Add users" }).click();
    await page.getByLabel("Name", { exact: true }).fill("test user");
    await page.getByLabel("Email", { exact: true }).fill("newuser@test.com");
    await page.getByLabel("Location", { exact: true }).fill("Addis Ababa");
    await page.getByLabel("Phone Number").fill("0912345678");
    await page.getByLabel("Password", { exact: true }).fill("123456");
    await page.getByLabel("", { exact: true }).click();
    await page.getByText("kitchenManager").click();
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.getByText("Something went wrong")).toBeVisible();
  });

  test("should switch user Status successfully", async ({ page }) => {
    await page
      .getByRole("row", { name: "test user 0912345678 newuser@" })
      .getByLabel("Switch demo")
      .click();

    await expect(
      page.getByText("User status updated successfully")
    ).toBeVisible();
  });

  test("should delete a user successfully", async ({ page }) => {
    await page
      .getByRole("row", { name: "test user 0912345678 newuser@" })
      .locator("div")
      .nth(2)
      .click();

    await expect(page.getByText("User deleted successfully")).toBeVisible();
  });
});
