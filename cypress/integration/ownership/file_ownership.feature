Feature: Transfer file ownership

  Rule: As an owner, I want to transfer the ownership of the file so that the new owner will have all rights to it.

    Background:
      Given Register without UI
      And Register without UI user2
      And Login as new user without UI
      And The user upload "TestUpload.txt" without UI

    @positive
    Scenario: Transfer file ownership in root folder
      Given The user 1 is the owner of the file
      When The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter User 2 email
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      And Spin is visible "Changing permissions..."
      Then Message about transfer ownership "Permissions updated successfully"
      And Login as new user 2 without UI
      And User 2 became Owner of "TestUpload.txt" file
      And User 1 has Editors rights to "TestUpload.txt" file

#    @negative
#    Scenario: User can not transfer file ownership to the user with incorrect email
#      Given The user 1 is the owner of the file
#      When The user press the Actions button in "TestUpload.txt" file
#      And The user press the Share button in "TestUpload.txt" file
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter "invalidemail@gmail.com"
#      And Press "Confirm"
#      Then Error message "User for sharing not found."
#
#    @negative
#    Scenario: User can not transfer file ownership to the user if he already has them
#      Given The user 1 is the owner of the file
#      When The user press the Actions button in "TestUpload.txt" file
#      And The user press the Share button in "TestUpload.txt" file
#      And Enter email user 1
#      And Choose the "Transfer ownership" option from pop-up window
#      And Press "Confirm"
#      Then Warning message "This user is the owner of this file"
#
#    @negative
#    Scenario: User can not transfer file ownership to some users
#      Given The user 1 is the owner of the file
#      And Register without UI user3
#      When The user press the Actions button in "TestUpload.txt" file
#      And The user press the Share button in "TestUpload.txt" file
#      And Enter email user2 and user3 in field "email"
#      And Choose the "Transfer ownership" option from pop-up window
#      Then Notification below the field "The only one user can own a file"

#    @negative
#    Scenario:  User can not transfer file ownership if field "email" is empty
#      And The user 1 is the owner of the file
#      When The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Field "email" is empty
#      Then Error message under the input field "Please enter the email of the user to whom you want to transfer rights"
#
#    @negative
#    Scenario: User can not transfer file ownership if field "email" contain spaces
#      And The user 1 is the owner of the file
#      When The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter "spaces" in field "email"
#      Then Error message under the input field "Please enter the email of the user to whom you want to transfer rights"


