Feature: Order Managment feature
    In order to manage orders
    As a customer
    I want to place an order and view my order history.

  Background:
    Given the user is logged in with email "customer@example.com" and password "123456"

  Scenario: Successful Order Placement
    When the customer click Order button for a specific pizza
    Then the customer should be redirected to "https://pizza-ordering-omega.vercel.app/order/" page
    Given the customer selected a pizza with price 298
    When the customer Uncheck the "Bacon", "new" and "Pepperoni" toppings
    And the customer click the plus button to increase the quantity
    Then the customer should see the quantity increased to 2
    And the price should be doubled
    When the customer click the minus button to decrease the quantity
    Then the customer should see the quantity decreased by 1
    And the price should be halved
    When the customer click the "Order" button
    Then the customer should see "Your order has been successfully completed!" message

  Scenario: View Order History
    Given the customer has previously ordered pizaa with name "test"
    When the customer click the "Orders" navlink
    Then the customer should be redirected to "https://pizza-ordering-omega.vercel.app/orders" page
    And the customer should see "test" pizza order
