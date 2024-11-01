import { Given, Then, When } from "@cucumber/cucumber";
import { updateOrderStatus } from "../../lib/adminActions.ts";
import assert from "assert";

Given(
  "I have a resturant with id {string} and an order with id {string}",
  function (resturantId: string, orderId: string) {
    this.orderId = orderId;
    this.resturantId = resturantId;
  }
);

Given(
  "I have a resturant with id {string} and with an invalid order id {string}",
  function (resturantId: string, invalidOrderId: string) {
    this.orderId = invalidOrderId;
    this.resturantId = resturantId;
  }
);

When(
  "I update the status of the order to {string}",
  async function (newStatus: string) {
    this.updateOrderStatusRes = await updateOrderStatus({
      resturantId: this.resturantId,
      status: newStatus,
      orderId: this.orderId,
    });
  }
);

Then(
  "the status of the order should be {string}",
  function (expectedStatus: string) {
    const actualStatus = this.updateOrderStatusRes.order.status;
    assert.strictEqual(actualStatus, expectedStatus);
  }
);

Then("I should see a message {string}", function (expectedMessage: string) {
  const actualMessage = this.updateOrderStatusRes.message;
  assert.strictEqual(actualMessage, expectedMessage);
});
