import { Then, When, Given } from "@cucumber/cucumber";
import { fetchOrderByCustomerId } from "../../lib/customerActions.ts";
import assert from "assert";

When("the customer clicks on the order history tab", async function () {
  const customerId = "cm2oklqrz0019cbv0gq4wskfi";
  this.orderHisRes = await fetchOrderByCustomerId(customerId);
});

Then("the order history is successfully fetched", function () {
  assert.strictEqual(this.orderHisRes.success, true);
});

Given("a new customer who doesn't hava order history", function () {
  this.newCustomer = "cm2omls45000v7slt1ruhp6n3";
});

When("the click order history tab", async function () {
  const customerId = "cm2omls45000v7slt1ruhp6n3";
  this.orderHisRes = await fetchOrderByCustomerId(customerId);
});

Then("the customer should see {string}", function (msg: string) {
  assert.strictEqual(this.orderHisRes.message, msg);
});
