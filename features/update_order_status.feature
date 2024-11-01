Feature: update order status
  As a resturant admin
  I want to update the status of an order
  So that I can keep track of the order

  Scenario: update order status successfully
    Given I have a resturant with id "cm2oklql10000cbv082a7duqn" and an order with id "cm2omfym7000i7slticr6gstj"
    When I update the status of the order to "DELIVERED"
    Then the status of the order should be "DELIVERED"

  Scenario: update order status with invalid order id
    Given I have a resturant with id "cm2oklql10000cbv082a7duqn" and with an invalid order id "invalidIdorderid"
    When I update the status of the order to "DELIVERED"
    Then I should see a message "order not found"
