Feature: Transfer folder ownership
  As an owner, I want to transfer the ownership of the folder so that the new owner will have all rights to it.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Create folder with name "Folder1" in root without UI

  @positive
  Scenario: 1 Transfer folder ownership in root folder
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And "User2" became Owner of "Folder1" folder
    And The folder "Folder1" is visible
    And Login as new user without UI
    And The user open Shared with me
    And The folder "Folder1" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And Upload file "test1.txt" to "Folder1"
    And Button "New Folder" "be.visible"
    And Button "File Upload" "be.visible"
    And The file "test1.txt" is visible

  @positive
  Scenario: 2 Transfer ownership to a folder in a folder
    And Create folder with name "Folder2" in "Folder1"
    And RELOAD
#    And Spin is visible "Getting data..."
    And The user opens folder "Folder1"
    When The user press the "Actions" button in "Folder2" "folder"
    And The user press the "Share" button in "Folder2" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And "User2" became Owner of "Folder2" folder
    And The folder "Folder2" is visible
    And Login as new user without UI
    Then The folder "Folder1" is visible
    And The user open Shared with me
    And The folder "Folder2" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And Upload file "test1.txt" to "Folder2"
    And Button "New Folder" "be.visible"
    And Button "File Upload" "be.visible"
    And The file "test1.txt" is visible

  @negative
  Scenario: 3 User can not transfer folder ownership to the user with incorrect email
    Given The user 1 is the owner of the folder "Folder1"
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Choose the "Transfer ownership" option from pop-up window
    And Enter "invalidemail@gmail.com" email to field "#form_in_modal_email"
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 4 User can not transfer folder ownership to the user if he already has them
    Given The user 1 is the owner of the folder "Folder1"
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Enter "User1" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the owner of this file"

  @negative
  Scenario: 5 User can not transfer folder ownership to some users
    Given The user 1 is the owner of the folder "Folder1"
    And Register without UI user3
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Enter "User2 and User3" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    Then Notification below the field "Please enter the username or email of the user to whom you want to transfer rights"

  @negative
  Scenario: 6 User can not transfer folder ownership if field "email" is empty
    Given The user 1 is the owner of the folder "Folder1"
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Enter "nothing" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    And Press "Confirm"
    Then Notification below the field "Please enter the username or email of the user to whom you want to transfer rights"

  @negative
  Scenario: 7 User can not transfer folder ownership if field "email" contain spaces
    Given The user 1 is the owner of the folder "Folder1"
    When The user press the "Actions" button in "Folder1" "folder"
    And The user press the "Share" button in "Folder1" "folder"
    And Enter "spaces" email to field "#form_in_modal_email"
    And Choose the "Transfer ownership" option from pop-up window
    Then Notification below the field "Please enter the username or email of the user to whom you want to transfer rights"

    @positive
    Scenario: 8 User can transfer folder ownership if field "email" contain username
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the "Actions" button in "Folder1" "folder"
      And The user press the "Share" button in "Folder1" "folder"
      And Enter "UsernameUser2" email to field "#form_in_modal_email"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      When Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And The folder "Folder1" is visible
      And Login as new user without UI
      And The user open Shared with me
      And Spin is visible "Getting data..."
      Then "User1" has Editors rights to "Folder1" "folder"

    @positive
    Scenario: 9 User can transfer folder ownership with files in folder
      Given Upload file "TestUpload.txt" to "Folder1"
      And The user press the back button
      And Spin is visible "Getting data..."
      And Upload file "image.png" to "Folder1"
      And The user press the back button
      And Spin is visible "Getting data..."
      When The user press the "Actions" button in "Folder1" "folder"
      And The user press the "Share" button in "Folder1" "folder"
      And Enter "User2" email to field "#form_in_modal_email"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      And Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      Then The folder "Folder1" is visible
      And The user opens folder "Folder1"
      And The file "TestUpload.txt" is visible
      And The file "image.png" is visible
