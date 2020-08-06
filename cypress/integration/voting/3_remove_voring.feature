@test_case_4.3
@create_voting
#./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.3'

Feature:  Remove users from voting
  As a file owner, I want to manage the list of voters so that I can remove some users from voting

  Background:
    Given Register without UI
    And Register without UI user2
    And Register without UI user3
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
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

  @positive
  Scenario: 1 Remove users from voting
    And 2 users participate in the voting "User2, User3"
    And Owner delete "User2" from voting
    And 1 users participate in the voting "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"

  @negative
  Scenario: Owner can't remove all users from voting
    And 2 users participate in the voting "User2, User3"
    And Owner delete "User2" from voting
    And 1 users participate in the voting "User3"
    And Owner delete "User3" from voting
    And 1 users participate in the voting "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"

  @positive
  Scenario: 3 After revoking user from first voting, this user can participate in second voting
    And 2 users participate in the voting "User2, User3"
    And Owner delete "User2" from voting
    And 1 users participate in the voting "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"

    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding 3 of choices
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
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"





