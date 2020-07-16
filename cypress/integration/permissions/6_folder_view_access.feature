@test_case_3.6
@grant_view_access_for_a_folder

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.6'

Feature: Grant view access for a folder
  As an owner or editor of the folder, I want to provide rights for
  viewing to another User so that this user can see the folder.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Create folder with name "testFolder" in root without UI

  @positive
  Scenario: 1 View access by owner
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And The user press the "Actions" button in "testFolder" "folder"
    And Button "Share " "not.be.visible"
    And The user opens folder "testFolder"
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  @positive
  Scenario: 2 View access by editor
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Choose the "View Only" option from pop-up window
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And The user press the "Actions" button in "testFolder" "folder"
    And Button "Share " "not.be.visible"
    And The user opens folder "testFolder"
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  @positive
  Scenario: 3 User can grand view access for a folder with files inside
    And Upload file "TestUpload.txt" to "testFolder"
    And The user press the back button
    And Spin is visible "Getting data..."
    And Upload file "txtFile.txt" to "testFolder"
    And The user press the back button
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is visible
    And The user opens folder "testFolder"
    And The file "txtFile.txt" is visible
    And The file "TestUpload.txt" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  @positive
  Scenario: 4 Editor can grand view access for a folder in the shared folder to the user 3
    And Upload file "TestUpload.txt" to "testFolder"
    And The user press the back button
    And Spin is visible "Getting data..."
    And Upload file "txtFile.txt" to "testFolder"
    And The user press the back button
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is visible
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The file "txtFile.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is not visible
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The file "txtFile.txt" is not visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  @negative
  Scenario: 5 Owner can not grand view access for a folder to the user with incorrect email
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 6 Owner can not grand view access for a folder to the user if he already has them
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the viewer of this file"

  @negative
  Scenario: 7 Owner can not grand view access for a folder to himself
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User1" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the owner of this file"

  @negative
  Scenario: 8 Viewer can not grand view access for a folder to himself
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is visible
    And The user press the "Actions" button in "testFolder" "folder"
    And Button "Share " "not.be.visible"

  @negative
  Scenario: 9 Owner can not grand view access for a folder to some users
    And Register without UI user3
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2 and User3" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 10 Owner can not grand view access for a folder if field "email" is empty
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "nothing" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

  @negative
  Scenario: 11 Owner can not grand view access for a folder if field "email" contain spaces
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "spaces" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 12 Owner can not grand view access for a folder if field "email" contain username
    When The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "UsernameUser2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @positive
  Scenario: 13 Viewer can see files that were created in the shared folder after the transfer of viewing rights
    Given The user 1 is the owner of the folder "testFolder"
    And The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Upload file "TestUpload.txt" to "testFolder"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
