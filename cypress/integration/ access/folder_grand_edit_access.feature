@test_case_3.4
@grant_edit_access_for_a_file

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.4'

Feature: Grant edit access for a file
  As an owner or editor of the folder, I want to provide rights
  for edition to another User so that this user can operate with this folder.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Create folder with name "testFolder" in root without UI

  Scenario: 1 Edit access by owner
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User has Editors rights to "testFolder" folder

  @positive
  Scenario: 2 Edit access by editor
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User has Editors rights to "testFolder" folder

    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Choose the "View and Update" option from pop-up window
    And Register without UI user3
    And Enter User 3 email
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then User has Editors rights to "testFolder" folder

  @positive
  Scenario: 3 User can  grand access for a folder with files inside
    Given Upload file "TestUpload.txt" to testFolder


