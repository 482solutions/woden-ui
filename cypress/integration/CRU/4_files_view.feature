@test_case_2.4
@files_view
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.4'

Feature: Files view
  As a user (any role), I want to view the available file so that I can use it

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      And The user press Upload a new file button
      And Choose the needed "txtFile.txt" file from its PC directory
      Then The file "txtFile.txt" is uploaded

    Scenario: 1 File view
      Given The user located on root dashboard
#    And the user has access to any available file
      When The user double click the file "txtFile.txt"
#  TODO:
      Then The file is downloaded