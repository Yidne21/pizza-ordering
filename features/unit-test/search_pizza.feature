Feature: search pizza
  As a customer
  I want to search for a pizza
  So that I can find the pizza I want to order

  Scenario: search for existing pizza
    Given I am on the pizza list page
    When I search for "new"
    Then I should see the pizza "new"

  Scenario: search for non-existing pizza
    Given I am on the pizza list page
    When I search for "non existing" pizza
    Then I should see "pizza not found"
