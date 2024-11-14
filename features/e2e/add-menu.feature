Feature: Add Menu Page

  Background:
    Given the user is logged in with email "admin@example.com" and password "123456"

  Scenario: Successfully add a new menu item
    Given I am on the Add Menu page
    When I fill in the "Name" field with "Playwright Pizza"
    And I fill in the "Price" field with "300"
    And I uncheck the "Pepperoni" topping
    And I uncheck the "Black olives" topping
    And I add a new topping with a random unique name
    And I upload the image file "featPizza3.png"
    And I submit the form
    Then I should see a success message "You have uploaded the Pizza successfully."
