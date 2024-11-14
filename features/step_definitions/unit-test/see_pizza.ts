import { Given, Then, When } from "@cucumber/cucumber";
import { getPizzaDetails } from "../../../lib/customerActions.ts";
import assert from "assert";

Given("I am on the pizza list page", function () {
  this.pizzaId = "cm2olk9y3000dwep3qqmj7ihz";
});

When("I click on a pizza", async function () {
  this.pizzaDetail = await getPizzaDetails(this.pizzaId);
});

Then("I should see the pizza details", function () {
  assert.strictEqual(this.pizzaDetail.pizzaId, this.pizzaId);
  assert.strictEqual(typeof this.pizzaDetail, "object");
});
