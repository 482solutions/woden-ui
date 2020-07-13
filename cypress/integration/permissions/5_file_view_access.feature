@test_case_3.5
@grant_edit_access_for_a_folder

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.5'

Feature: Grant view access for a file
  As an owner or editor of the file, I want to provide rights for
  viewing to another User so that this user can see the file.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI

  @positive
  Scenario: 1 View access by owner
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And User has View rights to "TestUpload.txt" file that contain "Good night!"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"
    And Button "Share " "not.be.visible"
    And Login as new user without UI
    And The user 1 is the owner of the file

  @positive
  Scenario: 2 View access by editor
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Choose the "View Only" option from pop-up window
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The file "TestUpload.txt" is visible
    And User has View rights to "TestUpload.txt" file that contain "Good night!"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"

  @positive
  Scenario: 3 User with View rights can view all versions of the file
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Choose the needed "TestUpload.txt" for update to file with "txtFile.pem" name
    And Spin is visible "Updating file..."
    Then Message about update file "File updated successfully"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"
    And The user press the "Versions" button in "TestUpload.txt" "file"
    And Spin is visible "Getting file versions..."
    And The user sees the list of available versions and the time, date when the version was created

  @positive
  Scenario: 4 Owner can provide the access to view 1 file in a folder with many files
    And Create folder with name "testFolder" in root without UI
    And Upload file "TestUpload.txt" to "testFolder"
    And Back to My Drive from folder
    And Upload file "txtFile.txt" to "testFolder"
    When The user press the "Actions" button in "txtFile.txt" "file"
    And The user press the "Share" button in "txtFile.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is not visible
    And The file "txtFile.txt" is visible
    And The file "TestUpload.txt" is not visible
    And The user press the "Actions" button in "txtFile.txt" "file"
    And Button "Update File" "not.be.visible"

  @positive
  Scenario: 5 Viewer can not provide the view access
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Share " "not.be.visible"

  @negative
  Scenario: 6 User can not grand view access for a file to the user with incorrect email
    And The user upload "TestUpload.txt" without UI
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 7 User can not grand view access for a file to the user if he already has them
    And The user upload "TestUpload.txt" without UI
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the viewer of this file"

  @negative
  Scenario: 8 Owner can not grand view access for a file to himself
    And The user upload "TestUpload.txt" without UI
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User1" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the owner of this file"

  @negative
  Scenario: 9 Editor can not grand view access for a file to himself
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    When Login as new user 2 without UI
    And The user open Shared with me
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the viewer of this file"

  @negative
  Scenario: 10 Owner can not grand view access for a file to some users
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    And Register without UI user3
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2 and User3" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 11 Owner can not grand view access for a file if field "email" is empty
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "nothing" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

  @negative
  Scenario: 12 Owner can not grand view access for a file if field "email" contain spaces
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "spaces" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 13 Owner can not grand view access for a file if field "email" contain username
    And The user upload "TestUpload.txt" without UI
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "UsernameUser2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"
