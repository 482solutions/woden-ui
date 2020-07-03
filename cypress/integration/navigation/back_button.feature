Feature: Back button
  As a user (Any role), I want to have a "back" button, so that I can return to the previous folder.

  Rule: user should be registered.

    Background:
      Given Login as new user without UI

    Scenario: 0 Create a user before starting the tests
      Given Spin is visible "Getting data..."
      And Create folder with name "Folder_level_1" in root without UI
      And Create folder with name "Folder_level_2" in "Folder_level_1"

    Scenario: 1 Back button from the 1 lvl folder
      Given The user opened folder "Folder_level_1" from the root folder
      And Spin is visible "Getting data..."
      When The user press the back button
      Then The User is transferred to the root folder
      And The Back button becomes inactive

    Scenario: 2 Back button from the n lvl folder
      Given The user opened folder "Folder_level_1" from the root folder
      And Spin is visible "Getting data..."
      And The user opened folder "Folder_level_2" in Folder_level_1
      And Spin is visible "Getting data..."
      When The user press the back button
      Then The User is transferred to the previous folder 1 level back
