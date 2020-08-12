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
  Scenario: 1 Editor can vote
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    When Login as new user 2 without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" is visible
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    When The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And User chooses variant "Yes"
    And Press "VOTE FOR: YES"
    And Spin is visible "Vote..."
    Then Pop-up "Congratulations!" with description "Your vote are in" is visible
    And Button "CONTINUE" "be.visible"
    And Press "CONTINUE"
#    TODO DELETE RELOAD
    And RELOAD
    And The user open Voting tab
    And The list of available voting is displayed
    Then Total voters for a file "TestUpload.txt" "1/2"
    And The user can not vote for this file "TestUpload.txt"

  Scenario: 2 Viewer can vote
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    When Login as new user 3 without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    When The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And User chooses variant "Yes"
    And Press "VOTE FOR: YES"
    And Spin is visible "Vote..."
    Then Pop-up "Congratulations!" with description "Your vote are in" is visible
    And Button "CONTINUE" "be.visible"
    And Press "CONTINUE"
#    TODO DELETE RELOAD
    And RELOAD
    And The user open Voting tab
    And The list of available voting is displayed
    Then Total voters for a file "TestUpload.txt" "1/2"
    And The user can not vote for this file "TestUpload.txt"

  Scenario: 3 Owner can vote
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    When Login as new user without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    When The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And User chooses variant "Yes"
    And Press "VOTE FOR: YES"
    And Spin is visible "Vote..."
    Then Pop-up "Congratulations!" with description "Your vote are in" is visible
    And Button "CONTINUE" "be.visible"
    And Press "CONTINUE"
#    TODO DELETE RELOAD
    And RELOAD
    And The user open Voting tab
    And The list of available voting is displayed
    Then Total voters for a file "TestUpload.txt" "1/2"
    And The user can not vote for this file "TestUpload.txt"

  Scenario: 4 User can't vote if the status is Closed
    Given The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    When Set time after voting ends
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    Then Status of voting is "closed" for a file "TestUpload.txt"
    And The user can not vote for this file "TestUpload.txt"

  Scenario: 5 User can't vote if he didn't choose an answer
    Given The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    When The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And Button "SUBMIT YOUR VOTE" is disable

  Scenario: 6 the selected answer option is reset after closing a pop-up
    Given The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    And The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    When User chooses variant "Yes"
    And Button "VOTE FOR: YES" "be.visible"
    And Close pop-up voting
    And The user press "Vote" button for voting
    And Pop-up "Voting" "be.visible"
    And User chooses variant "No"
    And Button "VOTE FOR: NO" "be.visible"














