@test_case_3.4
@grant_edit_access_for_a_folder

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.4'

Feature: Grant edit access for a folder
  As an owner or editor of the folder, I want to provide rights for
  edition to another User so that this user can operate with this folder.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Create folder with name "testFolder" in root without UI

  @positive @BAG
#  TODO: BAG 692
  Scenario: 1 Edit access by owner
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And Spin is visible "Getting data..."
    And The folder "testFolder" is not visible
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And User has Editors rights to "testFolder" folder

  @positive @BAG
  Scenario: 2 Edit access by editor
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And The folder "testFolder" is visible
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And User has Editors rights to "testFolder" folder
    And Button "New Folder" "be.visible"
    And Button "File Upload" "be.visible"
    And The user open Shared with me
    And Spin is visible "Getting data..."
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Choose the "View and Update" option from pop-up window
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The folder "testFolder" is not visible
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    Then User has Editors rights to "testFolder" folder
    And Button "New Folder" "be.visible"
    And Button "File Upload" "be.visible"

  @positive
  Scenario: 3 User can  grand edit access for a folder with files inside
    Given Upload file "TestUpload.txt" to "testFolder"
    And Back to My Drive from folder
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The folder "testFolder" is not visible
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is visible
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And Button "New Folder" "be.visible"
    And Button "File Upload" "be.visible"
    And The file "TestUpload.txt" is visible
    And User can update file "TestUpload.txt"

  @positive
  Scenario: 4 Editor can grand edit access for a file in the shared
  folder to the user 3 and user3 has rights only for shared file
    Given Upload file "TestUpload.txt" to "testFolder"
    And Back to My Drive from folder
    And Upload file "image.png" to "testFolder"
    And Back to My Drive from folder
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The folder "testFolder" is not visible
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And The user opens folder "testFolder"
    And The file "TestUpload.txt" is visible
    And The file "image.png" is visible
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Register without UI user3
    And Enter "User3" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is not visible
    And The file "TestUpload.txt" is visible
    And The file "image.png" is not visible

  @negative
  Scenario: 5 User can not grand access for a folder to the user with incorrect email
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 6 User can not grand edit access for a folder to the user if he already has them
    Given The user 1 is the owner of the folder "testFolder"
    And The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 7 Owner can not grand access for a folder to himself
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User1" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the owner of this file"

  @negative
  Scenario: 8 Editor can not grand access for a folder to himself
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "testFolder" is visible
    And The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Warning message "This user is the editor of this file"

  @negative
  Scenario: 9 Owner can not grand access for a file to some users
    Given The user 1 is the owner of the folder "testFolder"
    And Register without UI user3
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2 and User3" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 10 Owner can not grand access for a folder if field "email" contain spaces
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "spaces" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negativeTestUpload.txt
  Scenario: 11 Owner can not grand access for a folder if field "email" contain username
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "UsernameUser2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 12 Editor can can not to transfer ownership for a folder
    Given The user 1 is the owner of the folder "testFolder"
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then "Transfer ownership" option from pop-up window is not visible
