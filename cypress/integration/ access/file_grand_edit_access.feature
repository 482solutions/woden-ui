@test_case_3.
@grant_edit_access_for_a_file

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.3'

Feature: Grant edit access for a file
  As an owner or editor of the file, I want to provide rights for
  edition to anotherUser so that this user can operate with this file.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI

  @positive
  Scenario: 1 Edit access by owner
    Given The user 1 is the owner of the file
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User 2 became Editor of "TestUpload.txt" file

    And Login as new user without UI
    And The user 1 is the owner of the file

  @positive
  Scenario: 2 Edit access by editor
    Given The user 1 is the owner of the file
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User 2 became Editor of "TestUpload.txt" file

    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Choose the "View and Update" option from pop-up window
    And Register without UI user3
    And Enter User 3 email
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user press the Shared with me button 
    Then User 3 became Editor of "TestUpload.txt" file
