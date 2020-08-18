@test_case_4.5
@create_voting
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.5'

Feature: Voting results
  As a user (any role), I want to check results of ended votes.

  Background: Before the test
    Given Register without UI
    And Register without UI user2
    And Register without UI user3
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"

  Scenario: 1 Owner can view result of vote
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 3 variants
    Given "User1" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user 2 without UI
    And "User2" send a request to vote for the "No" variant for "TestUpload.txt" file
    And Login as new user 3 without UI
    And "User3" send a request to vote for the "Possibly" variant for "TestUpload.txt" file
    And Set time after voting ends
    And Login as new user without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "closed" for a file "TestUpload.txt"
    When Press "Results"
    Then Pop-up Result is opened
    And Count of voters "3" " / " "3"
    And The percentage of those "33.33%" who voted for the option "Yes"
    And The percentage of those "33.33%" who voted for the option "No"
    And The percentage of those "33.33%" who voted for the option "Possibly"
    And Close pop-up results of voting

  Scenario: 2 Editor can view result of vote
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 3 variants
    Given "User1" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user 3 without UI
    And "User3" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user 2 without UI
    And "User2" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Set time after voting ends
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "closed" for a file "TestUpload.txt"
    When Press "Results"
    Then Pop-up Result is opened
    And Count of voters "3" " / " "3"
    And The percentage of those "100%" who voted for the option "Yes"
    And The percentage of those "0%" who voted for the option "No"
    And The percentage of those "0%" who voted for the option "Possibly"
    And Close pop-up results of voting

  Scenario: 3 Viewer can view result of vote
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 3 variants
    Given "User1" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user 2 without UI
    And "User2" send a request to vote for the "No" variant for "TestUpload.txt" file
    And Login as new user 3 without UI
    And "User3" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Set time after voting ends
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "closed" for a file "TestUpload.txt"
    When Press "Results"
    Then Pop-up Result is opened
    And Count of voters "3" " / " "3"
    And The percentage of those "66.67%" who voted for the option "Yes"
    And The percentage of those "33.33%" who voted for the option "No"
    And The percentage of those "0%" who voted for the option "Possibly"
    And Close pop-up results of voting

  Scenario: 4 User can view result if he didn't voted
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 3 variants
    Given Login as new user 2 without UI
    And "User2" send a request to vote for the "No" variant for "TestUpload.txt" file
    And Login as new user 3 without UI
    And "User3" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user without UI
    And Set time after voting ends
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "closed" for a file "TestUpload.txt"
    When Press "Results"
    Then Pop-up Result is opened
    And Count of voters "2" " / " "3"
    And The percentage of those "50%" who voted for the option "Yes"
    And The percentage of those "50%" who voted for the option "No"
    And The percentage of those "0%" who voted for the option "Possibly"
    And Close pop-up results of voting

  Scenario: 5 User can't view result if permissions for a file removed after vote
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 3 variants
    Given Login as new user 2 without UI
    And "User2" send a request to vote for the "No" variant for "TestUpload.txt" file
    And Login as new user 3 without UI
    And "User3" send a request to vote for the "Yes" variant for "TestUpload.txt" file
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    When The user press the "delete" button near "viewer" "User3"
    And Spin is visible "Revoking access..."
    And Login as new user 3 without UI
    And The user open Voting tab
    And The list of available voting is displayed
    Then Voting for a file "TestUpload.txt" doesn't exist

  Scenario: 7 User can't vote if he was removed from voting but can view results
    And The "User1" sends a request to create vote for a file "TestUpload.txt" with 2 variants without "User2"
    And Login as new user 2 without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Voting for a file "TestUpload.txt" "be.visible"
    And Status of voting is "active" for a file "TestUpload.txt"
    And Total voters for a file "TestUpload.txt" "0/2"
    And The user can not vote for this file "TestUpload.txt"
    And Set time after voting ends
    When Login as new user 2 without UI
    And The user open Voting tab
    And The list of available voting is displayed
    And Status of voting is "closed" for a file "TestUpload.txt"
    When Press "Results"
    Then Pop-up Result is opened
    And Count of voters "0" " / " "2"
