@test_case_2.2
@open_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.2'

Feature: Open folders
  As a user (any role), I want to open any available folder so that I can upload files there.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI

    @positive
    Scenario Outline: Create folder before the test
      Given Spin is visible "Getting data..."
      Given Create folder with name <Name> in root without UI
      Examples: Folder's Name
        | Name                 |
        | Folder-1             |
        | folder2              |
        | FOLDER 3             |
        | Folder12345678901234 |
        | Папка                |
        | 資料夾                  |

    @positive
    Scenario Outline: 1 Open folder
#    And the user has access to any available folder (not root)
      When The user double click this folder <folder> from list
      And Spin is visible "Getting data..."
      And Folder is opened <folder>
      And User go back to root folder
      Examples: folder
        | folder               |
        | Folder-1             |
        | folder2              |
        | FOLDER 3             |
        | Folder12345678901234 |
        | Папка                |
        | 資料夾                  |