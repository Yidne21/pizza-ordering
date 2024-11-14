Feature: see pizza details
  As a customer
  I want to see the details of a pizza
  So that I can decide if I want to order it

  Scenario: see pizza details
    Given I am on the pizza list page
    When I click on a pizza
    Then I should see the pizza details
