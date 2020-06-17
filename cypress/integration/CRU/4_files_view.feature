@test_case_2.4
@files_view
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.4'

Feature: Files view
  As a user (any role), I want to view the available file so that I can use it

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Register without UI
      And Login as new user without UI
      And Spin is visible "Getting data..."
      When The user press Upload a new file button
      And Choose the needed "txtFile.pem" file from its PC directory
      And Spin is visible "Uploading file..."
      Then The file "txtFile.pem" is uploaded

    @positive
    Scenario: 1 File view
      Given The user located on root dashboard
#    And the user has access to any available file
      When The user double click the file "txtFile.pem"
      And Spin is visible "Downloading file..."
      Then The file is downloaded