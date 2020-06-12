@test_case_2.8
@viewing_previous_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.8'

Feature:  Search of files and folders
  As a user (any role), I want to have a search bar so that I can search any file or folder by its name.
  Rule: user should be registered and has files in folders.

    Background: Login
      Given Login as new user without UI

    Scenario: Create a user before starting the tests
      When Create folder with name "testFolder" in root without UI
      And Upload files test1.txt, test.pem to these folders without UI
      And Upload file to folder with name testFolder
      Then Folder "testFolder" should be visible on dashboard

    Scenario: 1 Search file by full name
      Given The user is authorized
      And Any page of the application is open
      When The user types the name "test1" of a file or folder
      And The user presses the search button
      Then Search result is file "test1.txt"

#    Scenario: 2 Search file by part of name
#      Given The user is authorized
#      And Any page of the application is open
#      When The user types the name "test" of a file or folder
#      And The user presses the search button
#      Then Search results are files "test1.txt" and "test.pem"
#      And search result is folder with name "testFolder"
#
#    Scenario: 3 Search file by one character
#      Given The user is authorized
#      And Any page of the application is open
#      When The user types the name "1" of a file or folder
#      And The user presses the search button
#      Then Search result is file "test1.txt"

#    Scenario: 4 Search file by the format
#      Given The user is authorized
#      And Any page of the application is open
#      When The user types the name "pem" of a file or folder
#      And The user presses the search button
#      Then Search result is file "test.pem"
#
#    Scenario: 5 Search file by 1 letter
#      Given The user is authorized
#      And Any page of the application is open
#      When The user types the name "t" of a file or folder
#      And The user presses the search button
#      Then Search results are files "test1.txt" and "test.pem"
#      And search result is folder with name "testFolder"
#
#    Scenario: 6 Search without characters in field
#      Given The user is authorized
#      And Any page of the application is open
#      When Search field is empty
#      Then Button Search not active

    Scenario: 7 Search file by word in the uppercase
      Given The user is authorized
      And Any page of the application is open
      When The user types the name "TEST" of a file or folder
      Then Search results are files "test1.txt" and "test.pem"
      And search result is folder with name "testFolder"
#      And The user presses the search button
#      Then Error message "Files or folders does not exist" is visible
