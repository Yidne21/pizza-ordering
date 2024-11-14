import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

When("the customer click Order button for a specific pizza", async function () {
  await this.page
    .locator(
      "div:nth-child(2) > .MuiPaper-root > .MuiCardContent-root > div > div > .MuiButtonBase-root"
    )
    .click();
  await this.page.waitForURL(
    "https://pizza-ordering-omega.vercel.app/order/cm2ptmhtj0000d0nwnvgfa2d7"
  );
});

Then(
  "the customer should be redirected to {string} page",
  async function (path: string) {
    const currentUrl = await this.page.url();
    expect(currentUrl).toContain(path);
  }
);

Given(
  "the customer selected a pizza with price {int}",
  async function (givenPrice: number) {
    this.currentPrice = givenPrice;
  }
);

When(
  "the customer click the plus button to increase the quantity",
  async function () {
    await this.page.getByRole("button").nth(1).click();
  }
);

Then(
  "the customer should see the quantity increased to {int}",
  async function (int: number) {
    await expect(this.page.getByText(`${int}`, { exact: true })).toBeVisible();
  }
);

Then("the price should be doubled", async function () {
  await expect(
    this.page.getByText(`${this.currentPrice * 2}`, { exact: true })
  ).toBeVisible();
});

When(
  "the customer click the minus button to decrease the quantity",
  async function () {
    await this.page.getByRole("button").first().click();
  }
);

Then("the price should be halved", async function () {
  await expect(
    this.page.getByText(`${this.currentPrice}`, { exact: true })
  ).toBeVisible();
});

Then(
  "the customer should see the quantity decreased by {int}",
  async function (int: number) {
    await expect(this.page.getByText(`${int}`, { exact: true })).toBeVisible();
  }
);

When(
  "the customer Uncheck the {string}, {string} and {string} toppings",
  async function (s: string, s2: string, s3: string) {
    await this.page.getByLabel(`${s}`).uncheck();
    await this.page.getByLabel(`${s2}`).uncheck();
    await this.page.getByLabel(`${s3}`).uncheck();
  }
);

When(
  "the customer click the {string} button",
  async function (btnName: string) {
    await this.page.getByRole("button", { name: btnName }).click();
  }
);

Then(
  "the customer should see {string} message",
  async function (successMsg: string) {
    await expect(this.page.getByText(successMsg)).toBeVisible();
  }
);

Given(
  "the customer has previously order pizza with name {string}",
  async function (pizzaName: string) {
    this.givenPizzaName = pizzaName;
  }
);

When(
  "the customer click the {string} navlink",
  async function (navlinkLabel: string) {
    await this.page.getByRole("link", { name: navlinkLabel }).first().click();
    await this.page.waitForURL(
      "https://pizza-ordering-omega.vercel.app/orders"
    );
  }
);

Then(
  "the customer should see {string} pizza order",
  async function (pizzaName: string) {
    await this.page.getByText(pizzaName);
  }
);

Given(
  "the customer has previously ordered pizaa with name {string}",
  async function (pizzaName: string) {
    this.givenPizzaName = pizzaName;
  }
);
