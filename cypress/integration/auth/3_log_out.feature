@test_case_1.3
@log_out
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_1.3'

Feature: Log out
  As a user (any role), I want to log out the system so that I can log in with different credentials.

  Rule: user should be registered.

    Background:
      Given Register without UI
      And Login as new user without UI

    @positive
    Scenario: 1 Log out
      Given Spin is visible "Getting data..."
      And User is signed in
      When The user press "Logout" button for exit
      Then The user is transferred to 'Sign in' page
