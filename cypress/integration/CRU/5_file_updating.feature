@test_case_2.5
@files_view
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.5'

Feature:  File updating
  As an owner or editor, I want to update the file so that the correct version could be used.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      And The user press Upload a new file button
      And Choose the needed "test_positive.txt" file from its PC directory
      Then The "test_positive.txt" file is uploaded

    Scenario: 1 File updating
#    Given The user has access to the file with owner or editor rights
      When The user press the Update button
#    And Choose the new file from his computer
##    внести изменения в сущетвующий файл
#    And the chosen file has the same name "test_positive"
#    Then The new version of the file is updated
#    And The last version remains in the system
#
#  Scenario: 2 File updating
#    Given The user has access to the file with owner or editor rights
#    And User want to upload the file with name "test_positive"
#    When The user press the Update button
#    And Choose the file with name 'test_negative' from its PC directory
#    Then File is not uploaded
#    And The user is notified that a "The file you try to update has a different name"
