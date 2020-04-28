@test_case_1.3
@log_out
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_1.3'

Feature: Uploading file
  As a user (any role), I want to log out the system so that I can log in with different credentials

  Rule: user should be registered.

  #  Before('Register new user and sign in', function () {});

  Scenario: 1 Log out with button
    Given The user is signed in
    And the session is open
    When The user press "Logout" button for exit
    Then The user is transferred to'Sign in Sign up' page
    And the session is closed

  Scenario: 2 User can logout, if will close the session
    Given The user is signed in
    And the session is open
    When The user close the session
    And Open application
    Then The user is transferred to'Sign in Sign up' page
    And user not logged in
