import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the Roles page", async function () {
  await this.page.goto(
    "https://pizza-ordering-omega.vercel.app/dashboard/roles"
  );
});

When("I click the {string} button", async function (buttonName) {
  await this.page.getByRole("button", { name: buttonName }).click();
});

When("I check {string}", async function (label) {
  await this.page.getByLabel(label).check();
});

When("I delete the role {string}", async function (roleName) {
  await this.page
    .getByRole("row", { name: roleName })
    .locator("div")
    .nth(3)
    .click();
});

When("I try to delete the role {string}", async function (roleName) {
  await this.page
    .getByRole("row", { name: roleName })
    .locator("div")
    .nth(3)
    .click();
});

When("I edit the role {string}", async function (roleName) {
  await this.page
    .getByRole("row", { name: roleName })
    .locator("div")
    .nth(2)
    .click();
});

When("I clear the {string} field", async function (field) {
  await this.page.getByLabel(field, { exact: true }).fill("");
});

When("I toggle the status of the role {string}", async function (roleName) {
  await this.page
    .getByRole("row", { name: roleName })
    .getByLabel("Switch demo")
    .click();
});

Then("I should see {string} message", async function (message) {
  const successMessage = this.page.locator(`text=${message}`);
  await successMessage.waitFor({ state: "visible" });
  await expect(successMessage).toBeVisible();
});

When(
  "I fill in the role {string} field with {string}",
  async function (s: string, s2: string) {
    await this.page.getByLabel(s, { exact: true }).fill(s2);
  }
);
