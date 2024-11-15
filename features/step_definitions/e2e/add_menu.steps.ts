import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

function getFilePath(relativePath: string) {
  const _filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(_filename);
  return resolve(__dirname, relativePath);
}

let randomUniqToppingName;

Given("I am on the Add Menu page", async function () {
  await this.page.goto(
    "https://pizza-ordering-omega.vercel.app/dashboard/add-menu"
  );
});

When(
  "I fill in the {string} field with {string}",
  async function (field, value) {
    await this.page.getByLabel(field).fill(value);
  }
);

When("I uncheck the {string} topping", async function (topping) {
  await this.page.locator("label").filter({ hasText: topping }).uncheck();
});

When("I add a new topping with a random unique name", async function () {
  randomUniqToppingName = `Topping_${Math.random()
    .toString(36)
    .substring(2, 11)}`;
  await this.page.getByRole("button", { name: "Add" }).click();
  await this.page.getByLabel("New Topping").fill(randomUniqToppingName);
  await this.page.getByLabel("New Topping").press("Enter");
  await this.page
    .locator("label")
    .filter({ hasText: randomUniqToppingName })
    .check();
});

When("I upload the image file {string}", async function (filename) {
  const logoPath = getFilePath(filename);
  await this.page.getByText("Upload Pizza Photo").setInputFiles(logoPath);
});

When("I submit the form", async function () {
  await this.page.getByRole("button", { name: "Submit" }).click();
});

Then(
  "I should see a success message {string}",
  async function (message: string) {
    const successMessage = this.page.locator(`text=${message}`);
    await successMessage.waitFor({ state: "visible" });
    await expect(successMessage).toBeVisible();
  }
);
