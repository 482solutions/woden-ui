@test_case_2.1
@creating_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.1'

Feature: Creating folders
  As a user (any role), I want to create a new folder so that I can upload files in it.
  For the folder name, the minimum amount of number is 1
  and the maximum amount of numbers is 20. All symbols are allowed.

  Rule: user should be registered.

  Background: Create a user before starting the tests
    Then Login as new user

  Scenario Outline: 1 New folder in root folder
    Given The user is located in his root folder
    When The user press Create a new folder button
    And The field name is empty
    And The field name <Name> is filled by user from list of folder name
    And Press Create folder
    Then The folder is created with name <Name>
    Examples: Folder's Name
      | Name                 |
      | F                    |
      | Folder-1             |
      | folder2              |
      | FOLDER 3             |
      | Folder12345678901234 |
      | Папка                |
      | 資料夾                |

  Scenario Outline: 2 Create new folder in user folder
    Given The user is created folder in root folder with name <Name> from list
    And Open this folder with name <Name>
    When The user press Create a new folder button
    And The field name is empty
    And The field name <Name> is filled by user from list of folder name
    And Press Create folder
    Then The folder is created with name <Name>
#    And The user becomes the owner of this folder
    Examples: Folder's Name
      | Name                 |
      | Folder-1             |
      | folder2              |
      | FOLDER 3             |
      | Folder12345678901234 |
      | Папка                |
      | 資料夾                |

  Scenario: 3 User can not create folder without name
    Given The user is located in his root folder
    When The user press Create a new folder button
    And The field name is empty
    And Press Create folder
    Then error message is shown "Please input name for new folder"
    And Close folder creation window

  Scenario Outline: 4 User can not create folder with name more than 20 characters 
    Given The user is located in his root folder
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

    Scenario: 5 User can not create folder with spaces in name
      Given The user is located in his root folder
      When The user press Create a new folder button
      And The field name is empty
      And The field name contain only spaces
      And Press Create folder
      Then  error message about invalid folder name is shown "Name is not correct"