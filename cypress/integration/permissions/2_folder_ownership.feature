Feature: Transfer folder ownership

  Rule: As an owner, I want to transfer the ownership of the folder so that the new owner will have all rights to it.

    Background:
      Given Register without UI
      And Register without UI user2
      And Login as new user without UI
      And Create folder with name "Folder1" in root without UI

    @positive
    Scenario: 1 Transfer folder ownership in root folder
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      Then Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "Folder1" folder
      And The folder "Folder1" is visible
      And Login as new user without UI
      And The user open Shared with me
      And Spin is visible "Getting data..."
      And The folder "Folder1" is visible
      And Button "New Folder" "is not visible"
      And Button "File Upload" "is not visible"
      And The user opens folder "Folder1"
      And User has Editors rights to "Folder1" "folder"
      And Button "New Folder" "is visible"
      And Button "File Upload" "is visible"

    @positive @BAG
    Scenario: 2 Transfer ownership to a folder in a folder
      And The user opens folder "Folder1"
      And Create folder with name "Folder2" in "Folder1"
#      TODO delete And The user opens folder "Folder1":
      And The user opens folder "Folder1"
      When The user press the Actions button in "Folder2" folder
      And The user press the Share button in "Folder2" folder
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      And Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "Folder2" folder
      And The folder "Folder2" is visible
      And Login as new user without UI
      Then The folder "Folder1" is visible
      And The user open Shared with me
      And Spin is visible "Getting data..."
#         TODO: BAG 684:
      And The folder "testFolder2" is visible
      And Button "New Folder" "is not visible"
      And Button "File Upload" "is not visible"
      And The user opens folder "Folder2"
      And User has Editors rights to "testFolder2" "folder"
      And Button "New Folder" "is visible"
      And Button "File Upload" "is visible"

    @positive @BAG
    Scenario: 3 User can back to My Drive from transferred folder
      And The user opens folder "Folder1"
      And Create folder with name "Folder2" in "Folder1"
#    TODO delete And The user opens folder "Folder1":
      And The user opens folder "Folder1"
      When The user press the Actions button in "Folder2" folder
      And The user press the Share button in "Folder2" folder
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      And Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "Folder2" folder
      And The folder "Folder2" is visible
      And The user opens folder "Folder2"
      And User has Editors rights to "Folder2" "Folder1"
      And Back to My Drive from folder
      Then The user located on root dashboard

    @negative
    Scenario: 4 User can not transfer folder ownership to the user with incorrect email
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Choose the "Transfer ownership" option from pop-up window
      And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
      And Press "Confirm"
      Then Error message "User for sharing not found"

    @negative
    Scenario: 5 User can not transfer folder ownership to the user if he already has them
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "User1" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Warning message "This user is the owner of this file"

    @negative
    Scenario: 6 User can not transfer folder ownership to some users
      Given The user 1 is the owner of the folder "Folder1"
      And Register without UI user3
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "User2 and User3" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 7 User can not transfer folder ownership if field "email" is empty
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "nothing" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

    @negative
    Scenario: 8 User can not transfer folder ownership if field "email" contain spaces
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "spaces" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 9 User can not transfer folder ownership if field "email" contain username
      Given The user 1 is the owner of the folder "Folder1"
      When The user press the Actions button in "Folder1" folder
      And The user press the Share button in "Folder1" folder
      And Enter "UsernameUser2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"
