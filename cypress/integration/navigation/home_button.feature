@home_btn

Feature: Home button
  As a user (any role), I want to have a home button, so that I can return to the root folder

  Background:
    Given Register without UI
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And Create folder with name "FolderFolder" in root without UI
    And Spin is visible "Getting data..."

  Scenario: User can return from folder
    Given The folder "FolderFolder" is visible
    And The user opens folder "FolderFolder"
    And Spin is visible "Getting data..."
    And The user is located in "FolderFolder"
    When User click Home button
    And Spin is visible "Getting data..."
    Then The user is located in "My Drive"
    And The Home button becomes inactive

  Scenario: 2 Back to "Shared with me" from the shared folder
    Given Register without UI user2
    And The "User1" sends a request to grant "edit" access to the "folder" "FolderFolder" to "User2"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "FolderFolder" is visible
    And The user opens folder "FolderFolder"
    And Spin is visible "Getting data..."
    When User click Home button
    And Spin is visible "Getting data..."
    Then The user is located in "Shared with me"
