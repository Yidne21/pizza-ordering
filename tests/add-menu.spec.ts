import { test, expect } from "@playwright/test";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Utility function to get the absolute path for file uploads
function getFilePath(relativePath: string) {
  const _filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(_filename);
  return resolve(__dirname, relativePath);
}

test.describe("Add Menu Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page and log in
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    // Verify that the login was successful and redirect to dashboard
    await page.waitForURL("/");
    await page.goto("/dashboard/add-menu");
  });

  test("should add a new menu successfully", async ({ page }) => {
    // Fill in the required fields for adding a new menu
    const randomUniqToppingName = `Topping_${Math.random()
      .toString(36)
      .substring(2, 11)}`;

    await page.getByLabel("Name").fill("Playwright Pizza");
    await page.getByLabel("Price").fill("300");

    // Uncheck specific toppings
    await page.locator("label").filter({ hasText: "Pepperoni" }).uncheck();
    await page.locator("label").filter({ hasText: "Black olives" }).uncheck();

    // Add a new custom topping
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByLabel("New Topping").fill(randomUniqToppingName);
    await page.getByLabel("New Topping").press("Enter");
    await page
      .locator("label")
      .filter({ hasText: randomUniqToppingName })
      .check();

    // Upload the image file
    const logoPath = getFilePath("featPizza3.png");
    await page.getByText("Upload Pizza Photo").setInputFiles(logoPath);

    // Submit the form to add the new menu
    await page.getByRole("button", { name: "Submit" }).click();

    // Assert the success message is displayed
    // Wait for the success message to appear in the modal
    const successMessage = page.locator("text=You have uploaded the Pizza");

    // Wait for the success message to be visible
    await expect(successMessage).toBeVisible();
  });
});
