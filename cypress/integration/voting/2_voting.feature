@test_case_4.2
@create_voting
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.2'

Feature: Voting
  As a user (any role), I want to vote for any available file, so that my vote will be counting

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."

  @positive
  Scenario Outline: 1 <permission> can vote
    And The "User1" sends a request to grant "<permission>" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And User adding 2 of choices
    And Press "NEXT STEP"
    And User selects date and time
    And Press "NEXT STEP"
    And Description field <256> characters
    And Press "NEXT STEP"
    And 2 users participate in the voting "User2" and "User3"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    When Login as new user 2 without UI
    And Spin is visible "Getting data..."
    And The user open Voting
    And Spin is visible "Getting data..."
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "Active"
    And Button "Vote" for a file "TestUpload.txt" "be.visible"
    And Total voters for a file "TestUpload.txt" "0/1"
    When The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And User chooses variant "Yes"
    And Press "VOTE"
    Then Total voters for a file "TestUpload.txt" "1/1"
    And The user can not vote for this file again
    Examples: Permission
      | permission |
      | Editor     |
      | Viewer     |