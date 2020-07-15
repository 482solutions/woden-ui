@test_case_2.8
@viewing_previous_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.8'

Feature:  Search of files and folders
  As a user (any role), I want to have a search bar so that I can search any file or folder by its name.
  Rule: user should be registered and has files in folders.

    Background:
      Given Register without UI
      And Login as new user without UI
      And The user is authorized
      And Create folder with name "testFolder" in root without UI
      And The folder "testFolder" is visible
      And Upload file "test1.txt" to "testFolder"
      And The file "test1.txt" is visible
      And The user press the back button
      And Spin is visible "Getting data..."
      And Upload file "test.pem" to "testFolder"
      And The folder "test.pem" is visible
      And The user press the back button
      And Spin is visible "Getting data..."

    @positive
    Scenario: 1 Search file by full name
      Given The user is authorized
      When The user types the name "test1" of a file or folder
      And The user presses the search button
      Then Search result is "test1.txt"

    @positive
    Scenario: 2 Search file by part of name
      Given The user is authorized
      When The user types the name "test" of a file or folder
      And The user presses the search button
      Then Search result is "test1.txt"
      And Search result is "test.pem"
      And Search result is "testFolder"

    @positive
    Scenario: 3 Search file by one character
      Given The user is authorized
      When The user types the name "1" of a file or folder
      And The user presses the search button
      Then Search result is "test1.txt"

    @positive
    Scenario: 4 Search file by the format
      Given The user is authorized
      When The user types the name "pem" of a file or folder
      And The user presses the search button
      Then Search result is "test.pem"

    @positive
    Scenario: 5 Search file by 1 letter
      Given The user is authorized
      When The user types the name "t" of a file or folder
      And The user presses the search button
      Then Search result is "test1.txt"
      And Search result is "test.pem"
      And Search result is "testFolder"

    @negative
    Scenario: 6 Search without characters in field
      Given The user is authorized
      When Search field is empty
      Then Button Search not active

    @negative
    Scenario: 7 Search with spaces in field
      Given The user is authorized
      When The user types "    " in search field
      Then Button Search not active

#    @positive
#    Scenario: 8 Search file by word in the uppercase
#      Given The user is authorized
#      And Any page of the application is open
#      When The user types the name "TEST" of a file or folder
#      Then Search results are files "test1.txt" and "test.pem"
#      And search result is folder with name "testFolder"
#      TODO: And Error message "Files or folders does not exist" is not visible




