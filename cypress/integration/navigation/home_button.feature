@home_btn

Feature: Home button
  As a user (any role), I want to have a home button, so that I can return to the root folder

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      When User is created folder in root folder without UI

    Scenario: User can return from folder
      Given Folder "testFolder" should be visible on dashboard
      And The user double click this folder "testFolder"
      And The user is located in his created folder "testFolder"
      When User click Home button
      Then The user is located in his root folder