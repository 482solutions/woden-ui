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
      And The user press the Actions button in "TestUpload.txt" file
      And The user press the Share button in "TestUpload.txt" file
      And Enter User 2 email
      And Choose the "Transfer ownership" option from pop-up window
      And Press "Confirm"
      Then Login as new user 2 without UI
#      And User 2 became Owner of this file
#      And User 1 has Editors rights to this file

#    @negative
#    Scenario: User can not transfer file ownership to the user with incorrect email
#      Given The user 1 is the owner of the file
#      When The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter "invalidEmail"
#      Then Error message "User does not exist"
#
#    @negative
#    Scenario: User can not transfer file ownership  to the user if he already has them
#      Given The user 1 is the owner of the file
#      When The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter email user 1
#      And The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter email user 1
#      Then Warning message "This user is the owner of this file"
#
#    @negative
#    Scenario: User can not transfer file ownership to some users
#      Given Register the user 2
#      And The user 1 is the owner of the file
#      When The user 1 press "Ellipsis" button
#      And Press "Share" button
#      And Choose the "Transfer ownership" option from pop-up window
#      And Enter email user2  and user3  in field "email"
#      Then Warning message  "The only one user can own a file"
#
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


