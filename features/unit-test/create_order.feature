Feature: Order Pizza
    In order to get pizza delivery

  Scenario: Successful Order Placement
    Given the customer is logged in to the pizza ordering system
    When the customer select a pizza and click order button
    Then the order is successfully placed
