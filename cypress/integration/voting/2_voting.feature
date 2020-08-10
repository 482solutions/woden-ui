@test_case_4.2
@create_voting
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.2'

Feature: Voting
  As a user (any role), I want to vote for any available file, so that my vote will be counting

  Background:
    Given Register without UI
    And Register without UI user2
    And Register without UI user3
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."

  @positive
  Scenario: 1 <permission> can vote
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And User adding 2 of choices
    And Press "NEXT STEP"
    And User selects date and time
    And Press "NEXT STEP"
    And Description field 5 characters
    And Press "NEXT STEP"
    And 2 users participate in the voting "User2, User3"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    When Login as new user 2 without UI
    And Spin is visible "Getting data..."
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" is visible
#    And Status of voting is "Active"
#    And Button "Vote" for a file "TestUpload.txt" "be.visible"
#    And Total voters for a file "TestUpload.txt" "0/1"
#    When The user press "Vote" button for voting
#    And Pop-up "Voting" "be.visible"
#    And User chooses variant "Yes"
#    And Press "VOTE"
#    Then Total voters for a file "TestUpload.txt" "1/1"
#    And The user can not vote for this file again
#    Examples: Permission
#      | permission |
#      | Editor     |
#      | Viewer     |
