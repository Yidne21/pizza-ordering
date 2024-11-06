import { test, expect } from "@playwright/test";

test.describe("Roles Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    await page.waitForURL("/");
    await page.goto("/dashboard/roles");
  });

  test("should add a new role successfully", async ({ page }) => {
    await page.getByRole("button", { name: "Add roles" }).click();
    await page.getByLabel("Name", { exact: true }).fill("test role");
    await page.getByLabel("read roles").check();
    await page.getByLabel("read users").check();
    await page.getByLabel("update user").check();
    await page.getByLabel("delete order").check();
    await page.getByRole("button", { name: "Add Role" }).click();

    await expect(page.getByText("Role added successfully")).toBeVisible();
  });

  test("should not add a new role when name is empty", async ({ page }) => {
    await page.getByRole("button", { name: "Add roles" }).click();
    await page.getByRole("button", { name: "Add Role" }).click();

    await expect(page.getByText("Name is required")).toBeVisible();
  });

  test("should delete a role successfully", async ({ page }) => {
    await page
      .getByRole("row", { name: "test role 2024-11-06 Active" })
      .locator("div")
      .nth(3)
      .click();

    await expect(page.getByText("Role deleted successfully")).toBeVisible();
  });

  test("should not delete a role when the role is in use", async ({ page }) => {
    await page
      .getByRole("row", { name: "deliveryManager 2024-10-25" })
      .locator("div")
      .nth(3)
      .click();

    await expect(
      page.getByText(
        "Cannot delete role: It is given to users delete that users first."
      )
    ).toBeVisible();
  });

  test("should update a role successfully", async ({ page }) => {
    await page
      .getByRole("row", { name: "test role 2024-11-06 Active" })
      .locator("div")
      .nth(2)
      .click();
    await page.getByLabel("Name", { exact: true }).fill("updated role");
    await page.getByLabel("delete role").check();
    await page.getByLabel("read users").check();
    await page.getByRole("button", { name: "Update" }).click();

    await expect(page.getByText("Role updated successfully")).toBeVisible();
  });

  test("should not update a role when name is empty", async ({ page }) => {
    await page
      .getByRole("row", { name: "updated role 2024-11-06" })
      .locator("div")
      .nth(2)
      .click();
    await page.getByLabel("Name", { exact: true }).fill("");
    await page.getByRole("button", { name: "Update" }).click();

    await expect(page.getByText("role name is required")).toBeVisible();
  });

  test("should switch role status successfully", async ({ page }) => {
    await page
      .getByRole("row", { name: "updated role 2024-11-06" })
      .getByLabel("Switch demo")
      .click();

    await expect(
      page.getByText("Role status updated successfully")
    ).toBeVisible();
  });
});
