Feature: Back button
  As a user (Any role), I want to have a "back" button, so that I can return to the previous folder.

  Background:
    Given Register without UI
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And Create folder with name "Folder_level_1" in root without UI

  Scenario: 1 Back button from the 1 lvl folder
    Given The user opens folder "Folder_level_1"
    And Spin is visible "Getting data..."
    When The user press the back button
    Then The user is located in "My Drive"
    And The Back button becomes inactive

  Scenario: 2 Back button from the shared folder
    Given Register without UI user2
    And The "User1" sends a request to grant "edit" access to the "folder" "Folder_level_1" to "User2"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Folder_level_1" is visible
    And The user opens folder "Folder_level_1"
    And Spin is visible "Getting data..."
    And The user press the back button
    And Spin is visible "Getting data..."
    Then The user is located in "Shared with me"

  Scenario: 3 Back button from the n lvl folder
    Given Create folder with name "Folder_level_2" in "Folder_level_1"
    And RELOAD
    And The user opens folder "Folder_level_1"
    And Spin is visible "Getting data..."
    And The user opens folder "Folder_level_2"
    And Spin is visible "Getting data..."
    When The user press the back button
    Then The user is located in "Folder_level_1"
