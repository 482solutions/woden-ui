@test_case_2.7
@viewing_previous_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.7'

Feature:  Viewing previous version
  As a user (any role), I want to see any available version so that I can check what was changed.

  Background: Create a user before starting the tests
    Given Register without UI
    When Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And The user updating file "TestUpload.txt"

  @positive
  Scenario: 1 Viewing first version of the file
    Given Spin is visible "Getting data..."
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Versions button in "TestUpload.txt" file
    And Spin is visible "Getting file versions..."
    And The user sees the list of versions
    And Button Download is visible
    When The user press Download button on 1 version
    Then Version 1 should contain text "Good night!"

  @positive
  Scenario: 1 Viewing second version of the file
    Given Spin is visible "Getting data..."
    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Versions button in "TestUpload.txt" file
    And Spin is visible "Getting file versions..."
    And The user sees the list of versions
    And Button Download is visible
    When The user press Download button on 2 version
    Then Version 2 should contain text "Good morning!"