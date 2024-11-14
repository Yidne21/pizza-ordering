import { Given, Then, When } from "@cucumber/cucumber";
import { createOrder } from "../../../lib/customerActions.ts";
import assert from "assert";

Given("the customer is logged in to the pizza ordering system", function () {
  this.isLoggedIn = true;
});

When("the customer select a pizza and click order button", async function () {
  const pizzaId = "cm2olk9y3000dwep3qqmj7ihz";
  const customerId = "cm2oklqrz0019cbv0gq4wskfi";
  const quantity = 2;
  const total = 400;
  const toppings = [
    "cm2oklqls0002cbv0evlw5flt",
    "cm2olk9x3000cwep3ab9a0w73",
    "cm2oklqls0003cbv0gdcyhcl4",
  ];

  const formData = new FormData();
  formData.append("toppings", JSON.stringify(toppings));
  formData.append("pizzaId", pizzaId);
  formData.append("total", total.toString());
  formData.append("quantity", quantity.toString());
  formData.append("customerId", customerId);
  this.createOrderRes = await createOrder(formData);
});

Then("the order is successfully placed", function () {
  assert.strictEqual(this.createOrderRes.success, true);
  assert.strictEqual(this.createOrderRes.message, "Order placed successfully");
});
