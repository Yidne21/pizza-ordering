Feature: User Login
  As a registered customer
  I want to log in to my account
  So that I can access my personalized dashboard

  Scenario: Successful Login with valid credentials
    Given I open the login page
    When I enter "customer@example.com" and "123456" and click login
    Then I should be redirected to the home page

  Scenario: Failed Login with invalid credentials
    Given I open the login page
    When I enter "user@example.com" and "wrongpassword" and click login
    Then I should see an error message saying "Email or password doesn't match."

  Scenario: Attempt to login with empty fields
    Given I open the login page
    When I click login without entering credentials
    Then I should see an error message saying "please enter valid email"
