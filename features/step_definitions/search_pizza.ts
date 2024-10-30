import { Then, When } from "@cucumber/cucumber";
import { fetchPizzas } from "../../lib/customerActions.ts";
import assert from "assert";
export type Pizza = {
  id: string;
  name: string;
  price: number;
  image: string;
  resturant: string;
  logo: string;
  toppings: string;
};

When("I search for {string}", async function (query: string) {
  this.res = await fetchPizzas(query);
});

Then("I should see the pizza {string}", function (name: string) {
  assert.strictEqual(this.res.success, true);
  const pizzaNames = this.res.pizzas.map((pizza: Pizza) => pizza.name);
  assert.ok(pizzaNames.includes(name));
});

When("I search for {string} pizza", async function (notExisting: string) {
  this.res = await fetchPizzas(notExisting);
});

Then("I should see {string}", function (message: string) {
  assert.strictEqual(this.res.success, true);
  assert.strictEqual(this.res.message, message);
});
