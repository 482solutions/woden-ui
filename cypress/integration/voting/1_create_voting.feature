@test_case_4.1
@create_voting
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_4.1'

Feature:  Create voting
  As a file owner, I want to create new voting so that I can collect other opinions
  Time is calculated based on GMT +3

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And The user upload "TestUpload.txt" without UI
    And Spin is visible "Getting data..."

  @positive
  Scenario Outline: 1 Owner can create voting of the file with variants of answers
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Register without UI user3
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field <256> characters
    And Press "NEXT STEP"
    And Tab "4.List of voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2" and "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    Examples: Count of answers
      | count |
      | 2     |
      | 3     |
      | 4     |
      | 5     |

  @positive
  Scenario Outline: 2 Owner can create voting without description
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field "not filled"
    And Press "NEXT STEP"
    And Tab "4.List of voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2" and "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    Examples: Count of answers
      | count |
      | 2     |

  @negative
  Scenario: 3 Owner ca't start voting for a folder
    Given Create folder with name "Folder123" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Folder123" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "Folder123" "folder"
    Then Button Start Voting is not active

  @negative
  Scenario: 4 Owner can't create voting if another users haven't got permissions for this file
    And Login as new user without UI
    And Spin is visible "Getting data..."
    When The user press the "Actions" button in "TestUpload.txt" "file"
    Then  Button Start Voting is not active

  @negative
  Scenario: 5 Owner can't add more than 5 or less than 2 answer options
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
#    TODO: not active?? Press and locate at the same page:
    And Button "NEXT STEP" is not active
    And User adding 1 of choices
    And Button "NEXT STEP" is not active
    And User adding 4 of choices
    And Button "add choice" is not active

  @negative
  Scenario Outline: 6 Owner can't re-create a vote for the same file
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field "not filled"
    And Press "NEXT STEP"
    And Tab "4.List of voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2"
    And Press "START VOTING"
    And Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    When User click Home button
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    Then Button "Start voting" is not active
    Examples: Count of answers
      | count |
      | 2     |

  @negative
  Scenario Outline: 7 Owner can't create voting if description more than 256 characters
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And User adding <2> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field <count> characters
    And Button NEXT STEP is not active
    Examples: Count of characters
      | count |
      | 257   |
      | 300   |

  @negative
  Scenario: 8 Owner can't create voting if due time is real time
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And User adding <2> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    When User selects date and time, which is real time
    Then Button NEXT STEP is not active

  @negative
  Scenario: 9 Owner can't create voting if due time less than the real time
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And User adding <2> of choices
    And Press "NEXT STEP"
    When Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    Then User selects date and time, which less than the real time

  @positive
  Scenario Outline: 10 Owner can delete variant of answer
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Register without UI user3
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding <count> of choices
    When Delete 1 variant
    Then Count of variants <after>
    Examples: Count of answers
      | count | after |
      | 2     | 1     |
      | 3     | 2     |
      | 4     | 3     |
      | 5     | 4     |

  @positive
  Scenario: 11 Owner can close pop-up "Creating voting"
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Button "Cancel" "be.visible"
    When Press "Cancel"
    Then The user is located in "My Drive"

  @positive
  Scenario Outline: 12 Owner can back from <fromlocation> to <tolocation>
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
#    TODO Can user to move between the steps?
    Examples: location
      | fromlocation   | tolocation  |
      | Due Date       | Creating    |
      | Description    | Due Date    |
      | List of voters | Description |

  @positive
  Scenario Outline: 13 Owner can create voting for the second versions of the file with variants of answers
    And The user updating file "TestUpload.txt"
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    When The user press the "Start Voting" button in "TestUpload.txt" "file"
    And The screen for entering voting parameters is opened
    And Tab "1.Creating" is opened and title "Creating voting" is visible
    And Name of the document "TestUpload.txt" is visible in pop-up
    And User adding <count> of choices
    And Press "NEXT STEP"
    And Tab "2.Due Date" is opened and title "Pick end date and end time" is visible
    And User selects date and time
    And Press "NEXT STEP"
    And Tab "3.Description" is opened and title "Info" is visible
    And Description field "not filled"
    And Press "NEXT STEP"
    And Tab "4.List of voters" is opened and title "Voting participants" is visible
    And 2 users participate in the voting "User2" and "User3"
    And Press "START VOTING"
    Then Pop-up "Done!" with description "The voting becomes available" is visible
    And Button "CONTINUE" "be.visible"
    Examples: Count of answers
      | count |
      | 2     |
