@test_case_4.1
@create_voting
#./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.1'

Feature:  Create voting
  As a file owner, I want to create new voting so that I can collect other opinions
  Time is calculated based on GMT +3

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI

  @positive
  Scenario Outline: 1 Owner can create voting of the file with variants of answers
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
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field 256 characters
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2, User3"
    And Press "START VOTING"
    And Spin is visible "Creating vote..."
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    Examples: Count of answers
      | count |
      | 2     |
      | 3     |
      | 4     |
      | 5     |

  @positive
  Scenario: 2 Owner can create voting without description
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
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
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"

  @negative
  Scenario: 3 Owner can't start voting for a folder
    Given Create folder with name "Folder123" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Folder123" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "Folder123" "folder"
    Then Button "Start Voting" "be.not.visible"

  @negative
  Scenario: 4 Owner can't create voting if another users haven't got permissions for this file
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "TestUpload.txt" "file"
    Then Button Start Voting is disabled

  @negative
  Scenario: 5 Owner can't create voting with less than 2 answer options
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And Button NEXT STEP is disabled
    And User adding 1 of choices
    And Button NEXT STEP is disabled

  @negative
  Scenario: 6 Owner can't add more than 5 answer options
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And Button NEXT STEP is disabled
    And User adding 5 of choices
    And Info message "You can add up to 5 options" is visible
    Then Button Add variant is disabled

  @positive
  Scenario Outline: 7 Owner can re-create a vote for the same file
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 1 users participate in the voting "User2"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    And User click CONTINUE button

    And The user press the "Actions" button in "TestUpload.txt" "file"
    Then Button "Start Voting" "be.visible"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding <2count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 1 users participate in the voting "User2"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    Examples: Count of answers
      | count | 2count |
      | 2     | 3      |

  @negative
  Scenario Outline: 8 Owner can't create voting if description more than 256 characters
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding 2 of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field <count> characters
    And In field "Description" can contain only 256 characters
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And 1 users participate in the voting "User2"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    Examples: Count of characters
      | count |
      | 257   |
      | 300   |

  @negative
  Scenario: 9 Owner can't create voting if due time is real time
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding 2 of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    When User selects date and time, which is real time
    Then Button NEXT STEP is disabled

  @negative
  Scenario: 10 Owner can't create voting if due time less than the real time
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding 2 of choices
    And Press "NEXT STEP"
    When Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    Then User selects date and time, which less than the real time
    Then Button NEXT STEP is disabled

  @positive
  Scenario Outline: 11 Owner can delete variant of answer
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding <count> of choices
    When Delete 1 variant "Yes"
    Then Count of variants <after>
    Examples: Count of answers
      | count | after |
      | 2     | 1     |
      | 3     | 2     |
      | 4     | 3     |
      | 5     | 4     |

  @positive
  Scenario: 12 Owner can close pop-up "Creating voting"
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Button "CANCEL" "be.visible"
    When Press "CANCEL"
    Then The user is located in "My Drive"

  @positive
  Scenario: 13 Owner can back to any previous tab
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And User adding 2 of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And Press "BACK"
    And Tab "1.Creating" is opened and title "Create voting" is visible
    And Press "NEXT STEP"
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Press "BACK"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And Press "NEXT STEP"
    And Press "NEXT STEP"
    And Tab "4.List of Voters" is opened and title "Voting participants" is visible
    And Press "BACK"
    And Tab "3.Description" is opened and title "Info" is visible

  @positive
  Scenario: 14 Owner can create voting for the second versions of the file with variants of answers
    Given The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."
    And The user updating file "TestUpload.txt"
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
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
    And 1 users participate in the voting "User2"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
