@test_case_3.4
@grant_edit_access_for_a_file

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.4'

Feature: Grant edit access for a file
  As an owner or editor of the folder, I want to provide rights
  for edition to another User so that this user can operate with this folder.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Create folder with name "testFolder" in root without UI
    And The user 1 is the owner of the folder "testFolder"

  @positive
  Scenario: 1 Edit access by owner
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User has Editors rights to "testFolder" folder

  @positive
  Scenario: 2 Edit access by editor
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And User has Editors rights to "testFolder" folder

    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Choose the "View and Update" option from pop-up window
    And Register without UI user3
    And Enter User 3 email
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then User has Editors rights to "testFolder" folder

  @positive
  Scenario: 3 User can  grand access for a folder with files inside
    Given Upload file "TestUpload.txt" to testFolder
    And Back to My Drive from folder
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then Folder "testFolder" is visible
    And The user opens the shared folder "testFolder"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And User has Editors rights to "TestUpload.txt" file

  @positive
  Scenario: 4 Editor can grand access for a file in the shared folder to the user 3
    Given Upload file "TestUpload.txt" to testFolder
    And Upload file "image.png" to testFolder
    And Back to My Drive from folder
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    And Folder "testFolder" is visible
    And The user opens the shared folder "testFolder"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible

    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Share button in "TestUpload.txt" file
    And Register without UI user3
    And Enter User 3 email
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"

    And Login as new user 3 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then Folder "testFolder" is visible
    And The user opens the shared folder "testFolder"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The file "image.png" is not visible

  @negative
  Scenario: 5 User can not grand access for a folder to the user with incorrect email
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter "invalidemail@gmail.com"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Error message "User for sharing not found"

  @negative
  Scenario: 6 User can not grand access for a folder to the user if he already has them
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"

    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 7 Owner can not grand access for a folder to himself
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter email user 1
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 8 Editor can not grand access for a folder to himself
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    Then Message about transfer ownership "Permissions updated successfully"

    And Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then Folder "testFolder" is visible
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Warning message "This user is the editor of this file"

  @negative
  Scenario: 9 Owner can not grand access for a folder to some users
    And Register without UI user3
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter email user2 and user3 in field "email"
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 10 Owner can not grand access for a folder if field "email" is empty
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Field email is empty
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    Then Notification below the field "Please enter the email of the user to whom you want to transfer rights"

  @negative
  Scenario: 10 Owner can not grand access for a folder if field "email" contain spaces
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter spaces in field email
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 11 Owner can not grand access for a folder if field "email" contain username
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 name
    And Choose the "View and Update" option from pop-up window
    Then Notification below the field "Please enter a valid Email!"

  @negative
  Scenario: 12 Editor can can not to transfer ownership for a folder
    When The user press the Actions button in "testFolder" folder
    And The user press the Share button in "testFolder" folder
    And Enter User 2 email
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"

    When Login as new user 2 without UI
    And The user press the Shared with me button 
    And Spin is visible "Getting data..."
    Then "Transfer ownership" option from pop-up window is not visible



