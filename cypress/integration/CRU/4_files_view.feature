@test_case_2.4
@files_view
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.4'

Feature: Files view
  As a user (any role), I want to view the available file so that I can use it

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Register without UI
      When Login as new user without UI
      And The user upload "txtFile.pem" without UI

    @positive
    Scenario: 1 File view
      Given Spin is visible "Getting data..."
      And The user located on root dashboard
#    And the user has access to any available file
      When The user double click the file "txtFile.pem"
      And Spin is visible "Downloading file..."
      Then The file is downloaded

    @positive
    Scenario: 1 File view in versions
      Given Spin is visible "Getting data..."
      And The user located on root dashboard
#    And the user has access to any available file
      When The user double click the file "txtFile.pem"
      And Spin is visible "Downloading file..."
      Then The file is downloaded