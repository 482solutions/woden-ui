Feature: Transfer folder ownership

  Rule: As an owner, I want to transfer the ownership of the folder so that the new owner will have all rights to it.

    Background:
      Given Register without UI
      And Register without UI user2
      And Login as new user without UI
      And Create folder with name "testFolder" in root without UI

    @positive @BAG
    Scenario: 1 Transfer folder ownership in root folder
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      Then Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "testFolder" folder
      And The folder "testFolder" is visible
      And Login as new user without UI
      And The user open Shared with me
      And Spin is visible "Getting data..."
      And The folder "testFolder" is visible
      And Button "New Folder" "is not visible"
      And Button "File Upload" "is not visible"
      And The user opens folder "testFolder"
      And User has Editors rights to "testFolder" "folder"
      And Button "New Folder" "is visible"
      And Button "File Upload" "is visible"

    Scenario: 2 Transfer ownership to a folder in a folder
      Given The user 1 is the owner of the folder "testFolder"
      And The user opens folder "testFolder"
      And Create folder with name "testFolder2" in "testFolder"
#      TODO delete And The user opens folder "testFolder":
      And The user opens folder "testFolder"
      When The user press the Actions button in "testFolder2" folder
      And The user press the Share button in "testFolder2" folder
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      And Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "testFolder2" folder
      And The folder "testFolder2" is visible
      And Login as new user without UI
      Then The folder "testFolder" is visible
      And The user open Shared with me
      And Spin is visible "Getting data..."
      And The folder "testFolder2" is visible
      And Button "New Folder" "is not visible"
      And Button "File Upload" "is not visible"
      And The user opens folder "testFolder2"
      And User has Editors rights to "testFolder2" "folder"
      And Button "New Folder" "is visible"
      And Button "File Upload" "is visible"

    @negative
    Scenario: 3 User can not transfer folder ownership to the user with incorrect email
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Choose the "Transfer ownership" option from pop-up window
      And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
      And Press "Confirm"
      Then Error message "User for sharing not found"

    @negative
    Scenario: 4 User can not transfer folder ownership to the user if he already has them
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "User1" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Warning message "This user is the owner of this file"

    @negative
    Scenario: 5 User can not transfer folder ownership to some users
      Given The user 1 is the owner of the folder "testFolder"
      And Register without UI user3
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "User2 and User3" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 6 User can not transfer folder ownership if field "email" is empty
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "nothing" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

    @negative
    Scenario: 7 User can not transfer folder ownership if field "email" contain spaces
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "spaces" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 8 User can not transfer folder ownership if field "email" contain username
      Given The user 1 is the owner of the folder "testFolder"
      When The user press the Actions button in "testFolder" folder
      And The user press the Share button in "testFolder" folder
      And Enter "UsernameUser2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"
