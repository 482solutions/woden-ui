@test_case_2.4
@home_btn

Feature: Home button
  As a user (any role), I want to have a home button, so that I can return to the root folder

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI

#
#    Scenario: 1 File view
#      Given The user located on root dashboard
##    And the user has access to any available file
#      When The user double click the file "txtFile.txt"
#      Then The file is downloaded