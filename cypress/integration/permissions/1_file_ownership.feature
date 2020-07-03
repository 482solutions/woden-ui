Feature: Transfer file ownership

  Rule: As an owner, I want to transfer the ownership of the file so that the new owner will have all rights to it.

    Background:
      Given Register without UI
      And Register without UI user2
      And Login as new user without UI
      And The user upload "TestUpload.txt" without UI

    @positive
    Scenario: 1 Transfer file ownership in root folder
      Given The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "User2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      Then Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "TestUpload.txt" file
      And Login as new user without UI
      And The user open Shared with me
      And Spin is visible "Getting data..."
      And User has Editors rights to "TestUpload.txt" "file"

    @negative
    Scenario: 2 User can not transfer file ownership to the user with incorrect email
      Given The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Choose the "Transfer ownership" option from pop-up window
      And Enter "invalidemail@gmail.com" email to field "#form_in_modal_username"
      And Press "Confirm"
      Then Error message "User for sharing not found"

    @negative
    Scenario: 3 User can not transfer file ownership to the user if he already has them
      Given The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "User1" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Warning message "This user is the owner of this file"

    @negative
    Scenario: 4 User can not transfer file ownership to some users
      Given The user 1 is the owner of the file
      And Register without UI user3
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "User2 and User3" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 5 User can not transfer file ownership if field "email" is empty
      And The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "nothing" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

    @negative
    Scenario: 6 User can not transfer file ownership if field "email" contain spaces
      And The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "spaces" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"

    @negative
    Scenario: 7 User can not transfer file ownership if field "email" contain username
      And The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter "UsernameUser2" email to field "#form_in_modal_username"
      And Choose the "Transfer ownership" option from pop-up window
      Then Notification below the field "Please enter a valid Email!"
