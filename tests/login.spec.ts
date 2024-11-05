import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Open the browser and navigate to the login page
    await page.goto("/login");
  });

  test("should log in successfully with valid credentials", async ({
    page,
  }) => {
    // Fill in the email and password fields and submit the form
    await page.fill('input[name="email"]', "customer@example.com");
    await page.fill('input[name="password"]', "123456");
    await page.click('button[type="submit"]');

    // Assert that the page navigates to the home page
    await expect(page).toHaveURL("/");
  });

  test("should show an error message when login is attempted without credentials", async ({
    page,
  }) => {
    // Click the login button without filling any credentials
    await page.click('button[type="submit"]');

    // Assert that an appropriate error message is displayed
    const errorMessage = await page
      .locator("text=please enter valid email")
      .textContent();
    expect(errorMessage).toBe("please enter valid email");
  });

  test("should show an error message with incorrect credentials", async ({
    page,
  }) => {
    // Fill in incorrect email and password
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongPassword");
    await page.click('button[type="submit"]');

    // Assert that an appropriate error message is displayed
    const errorMessage = await page
      .locator("text=Email or password doesn't match.")
      .textContent();
    expect(errorMessage).toBe("Email or password doesn't match.");
  });
});
