@test_case_2.5
@files_view
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.5'

Feature:  File updating
  As an owner or editor, I want to update the file so that the correct version could be used.

  Scenario: Create a user before starting the tests
    Given Login as new user without UI
    And The user upload "test.pem" without UI

  Scenario: 1 File updating
    Given Login as new user without UI
    Given Update file "test.pem"
#      Given The user has access to the file with owner or editor rights
    When The user press the Actions button in "test.pem" file
    And The user press the Update button in "test.pem" file
    And Choose the needed "test.pem" file from its PC directory for update
    Then The new version of the file "test.pem" is updated
#      And The last version remains in the system
#
#    Scenario: 2 File updating
#      Given The user has access to the file with owner or editor rights
#      And User want to upload the file with name "test_positive"
#      When The user press the Update button
#      And Choose the file with name 'test_negative' from its PC directory
#      Then File is not uploaded
#      And The user is notified that a "The file you try to update has a different name"
