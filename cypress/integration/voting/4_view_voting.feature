@test_case_4.4
@view_open_voting
#./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.4'

Feature:  View open voting
  As a user (any role), I want to have a voting tab in my dashboard,
  so that I can see all available voting.

  Scenario: Create voting before the test
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Register without UI user3
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding 2 of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2, User3"
    And Press "START VOTING"
    And Spin is visible "Creating vote..."
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"

  @positive
  Scenario: 1 Owner view open voting
    And Login as new user without UI
    When The user open Voting tab
    Then The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"

  @positive
  Scenario: 2 Editor can view open voting
    And Login as new user 2 without UI
    When The user open Voting tab
    Then The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"

  @positive
  Scenario: 3 Viewer can view open voting
    And Login as new user 3 without UI
    When The user open Voting tab
    Then The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"

  @negative
  Scenario: 4 User can't view the vote if owner revokes all permissions on the file after creating the vote
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    When The user press the "delete" button near "viewer" "User3"
    And Spin is visible "Revoking access..."
    And Login as new user 3 without UI
    And Spin is visible "Getting data..."
    When The user open Voting tab
    Then The list of available voting is displayed
    And Voting for a file "TestUpload.txt" is not visible

  @positive
  Scenario: 5 User can view voting, if owner excluded his when creating a vote
    And Login as new user without UI
    And The user upload "test1.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "test1.txt" to "User2"
    And Register without UI user3
    And The "User1" sends a request to grant "view" access to the "file" "test1.txt" to "User3"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "test1.txt" "file"
    When The user press the "Start Voting" button in "test1.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "test1.txt" is visible in pop-up
    And User adding 2 of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2, User3"
    And Owner delete "User3" from voting
    And 1 users participate in the voting "User2"
    And Press "START VOTING"
    And Spin is visible "Creating vote..."
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    And Login as new user 3 without UI
    When The user open Voting tab
    Then The list of available voting is displayed
    And Voting for a file "test1.txt" "be.visible"
