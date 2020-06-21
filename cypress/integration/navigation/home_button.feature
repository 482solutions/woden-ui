@home_btn

Feature: Home button
  As a user (any role), I want to have a home button, so that I can return to the root folder

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI

    Scenario: User can return from folder
      And Create folder with name "FolderFolder" in root without UI
      Given Spin is visible "Getting data..."
      And Folder "FolderFolder" should be visible on dashboard
      And The user double click this folder "FolderFolder"
      Given Spin is visible "Getting data..."
      And The user is located in his created folder "FolderFolder"
      When User click Home button
      Given Spin is visible "Getting data..."
      Then The user is located in root folder
      And The Home button becomes inactive