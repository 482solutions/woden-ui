@test_case_2.1
@creating_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.1'

Feature: Creating folders
  As a user (any role), I want to create a new folder so that I can upload files in it.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      And Spin is visible "Getting data..."

    @positive
    Scenario Outline: 1 New folder in root folder
      And The user is located in "My drive"
      When The user press Create a new folder button
      And The field name is empty
      And The field name <Name> is filled by user from list of folder name
      And Press Create folder
      And Spin is visible "Creating folder..."
      Then The folder is created with name <Name>
      Examples: Folder's Name
        | Name                 |
        | F                    |
        | Folder-1             |
        | folder2              |
        | FOLDER 3             |
        | Folder12345678901234 |
        | Папка                |
        | 資料夾                  |

    @positive
    Scenario Outline: 2 Create new folder in user folder
      And The user is created folder in root folder with name <Name> from list
      And Open this folder with name <Name>
      And Spin is visible "Getting data..."
      When The user press Create a new folder button
      And The field name is empty
      And The field name <Name> is filled by user from list of folder name
      And Press Create folder
      And Spin is visible "Creating folder..."
      Then The folder is created with name <Name>
      Examples: Folder's Name
        | Name                 |
        | Folder-1             |
        | folder2              |
        | FOLDER 3             |
        | Folder12345678901234 |
        | Папка                |
        | 資料夾                  |

    @negative
    Scenario: 3 User can not create folder without name
      And The user is located in "My drive"
      When The user press Create a new folder button
      And The field name is empty
      And Press Create folder
      Then error message is shown "Please input name for new folder"
      And Close folder creation window

    @negative
    Scenario Outline: 4 User can not create folder with name more than 20 characters 
      And The user is located in "My drive"
      When The user press Create a new folder button
      And The field name is empty
      And The name field is filled by the user with data from the list <invalidName>
      And Press Create folder
      And error message about invalid folder name is shown "Name is not correct"
      Then The folder with invalid name <invalidName> is NOT created
      Examples: Invalid Name
        | invalidName                                                  |
        | 123456789012345678901                                        |
        | ABCDEABCDEABCDEABCDEABCDE                                    |
        | !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! |

    @negative
    Scenario: 5 User can not create folder with spaces in name
      And The user is located in "My drive"
      When The user press Create a new folder button
      And The field name is empty
      And The field name contain only spaces
      And Press Create folder
      Then  error message about invalid folder name is shown "Name is not correct"
