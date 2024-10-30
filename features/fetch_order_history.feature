Feature: fetch order history
  In order to view the order history
  As a customer
  I want to fetch the order history

  Scenario: Successful Order History Fetch
    Given the customer is logged in to the pizza ordering system
    When the customer clicks on the order history tab
    Then the order history is successfully fetched

  Scenario: No order history found
    Given a new customer who doesn't hava order history
    When the click order history tab
    Then the customer should see "No order history yet"
