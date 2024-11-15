Feature: Roles Page

  Background:
    Given the user is logged in with email "admin@example.com" and password "123456"

  Scenario: Add a new role successfully
    Given I am on the Roles page
    When I click the "Add roles" button
    And I fill in the role "Name" field with "test role"
    And I check "read roles"
    And I check "read users"
    And I check "update user"
    And I check "delete order"
    And I click the "Add Role" button
    Then I should see "Role added successfully" message

  Scenario: Fail to add a new role when name is empty
    Given I am on the Roles page
    When I click the "Add roles" button
    And I click the "Add Role" button
    Then I should see "role name is required!" message

  Scenario: Update a role successfully
    Given I am on the Roles page
    When I edit the role "test role 2024-11-15 Active"
    And I fill in the role "Name" field with "updated role"
    And I check "delete role"
    And I check "read users"
    And I click the "Update" button
    Then I should see "Role updated successfully" message

  Scenario: Fail to update a role when name is empty
    Given I am on the Roles page
    When I edit the role "updated role 2024-11-15"
    And I clear the "Name" field
    And I click the "Update" button
    Then I should see "role name is required" message

  Scenario: Switch role status successfully
    Given I am on the Roles page
    When I toggle the status of the role "updated role 2024-11-15"
    Then I should see "Role status updated successfully" message

  Scenario: Delete a role successfully
    Given I am on the Roles page
    When I delete the role "updated role 2024-11-15"
    Then I should see "Role deleted successfully" message

  Scenario: Fail to delete a role when it is in use
    Given I am on the Roles page
    When I try to delete the role "deliveryManager 2024-10-25"
    Then I should see "Cannot delete role: It is given to users delete that users first." message
