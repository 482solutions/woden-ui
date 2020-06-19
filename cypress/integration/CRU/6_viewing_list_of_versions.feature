@test_case_2.6
@viewing_list_of_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.6'

Feature:  Viewing previous version
  As a user (any role), I want to see a list of versions so that I can track the history of changes.

  Background: Create a user before starting the tests
    Given Register without UI
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The user updating file "TestUpload.txt"
    And Versions of "TestUpload.txt" are 2

  @positive
  Scenario: 1 Viewing list of versions
#    Given The user has access to the file with any type of rights
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Versions button in "TestUpload.txt" file
    And Spin is visible "Getting file versions..."
    Then The user sees the list of available versions and the time, date when the version was created
    And List of versions should contain name of file "TestUpload.txt"
    And Button Download is visible
    And Button Close versions is visible

  @positive
  Scenario: 2 User can close list of versions
#    Given The user has access to the file with any type of rights
    When The user press the Actions button in "TestUpload.txt" file
    And The user press the Versions button in "TestUpload.txt" file
    And Spin is visible "Getting file versions..."
    And The user sees the list of available versions and the time, date when the version was created
    Then Button Close versions is visible
    And User click Close list of versions button
    And The list of versions is not visible in dashboard
