@home_btn

Feature: Home button
  As a user (any role), I want to have a home button, so that I can return to the root folder

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      When Create folder with name "testFolder" in root without UI

    Scenario: User can return from folder
      Given Spin is visible "Getting data..."
      And Folder "testFolder" should be visible on dashboard
      And The user double click this folder "testFolder"
      Given Spin is visible "Getting data..."
      And The user is located in his created folder "testFolder"
      When User click Home button
      Given Spin is visible "Getting data..."
      Then The user is located in his root folder
      And The Home button becomes inactive