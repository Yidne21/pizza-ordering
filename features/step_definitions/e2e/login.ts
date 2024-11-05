import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I open the login page", async function () {
  await this.openBrowser();
  await this.page?.goto("./login");
});

When(
  "I enter {string} and {string} and click login",
  async function (email: string, password: string) {
    await this.page?.fill('input[name="email"]', email);
    await this.page?.fill('input[name="password"]', password);
    await this.page?.click('button[type="submit"]');
  }
);

When("I click login without entering credentials", async function () {
  await this.page?.click('button[type="submit"]');
});

Then("I should be redirected to the home page", async function () {
  await expect(this.page!).toHaveURL("./");
  await this.closeBrowser();
});

Then(
  "I should see an error message saying {string}",
  async function (expectedErrorMessage: string) {
    const errorMessage = await this.page
      ?.locator("text=" + expectedErrorMessage)
      .textContent();
    expect(errorMessage).toBe(expectedErrorMessage);
    await this.closeBrowser();
  }
);
