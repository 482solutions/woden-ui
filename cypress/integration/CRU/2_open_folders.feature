@test_case_2.2
@open_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.2'

Feature: Open folders
  As a user (any role), I want to open any available folder so that I can upload files there.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Register without UI
      And Login as new user without UI

    Scenario Outline: Create folders before the test
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

  Scenario Outline: 1 Open folder
#    And the user has access to any available folder (not root)
    When The user double click this folder <folder> from list
#    Then Folder is opened   TODO create the identifier of the user in the folder
    And User go back to root folder
    Examples: folder
      | folder               |
      | F                    |
      | Folder-1             |
      | folder2              |
      | FOLDER 3             |
      | Folder12345678901234 |
      | Папка                |
      | 資料夾                |

#  Scenario Outline: 2 Open folder with Enter key
#    And  the user has access to any available folder (not root)
#    When The user choice folder <folder> from list and press Enter
#    Then  Folder is opened
#    And User go back to root folder
#    Examples: folder
#      | folder               |
#      | F                    |
#      | Folder-1             |
#      | folder2              |
#      | FOLDER 3             |
#      | Folder12345678901234 |
#      | Папка                |
#      | 資料夾                |
