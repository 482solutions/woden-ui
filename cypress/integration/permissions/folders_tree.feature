@test_case_3.10
@view_access_list

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.10'

Feature: Folders tree
  As a user (any role), I want to have a folders tree so that I can move from folder to folder.

  Background:
    Given Register without UI
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And Create folder with name "testFolder" in root without UI

  @positive
  Scenario: 1 Owner can view tree and open open folder from tree
    And Upload file "TestUpload.txt" to "testFolder"
    And The user open folders tree
    And The tree is contain "testFolder"
    When User presses on "testFolder" folder in the tree
    Then The user is located in "testFolder"
    And The file "TestUpload.txt" is visible

  @positive
  Scenario: 2 Owner can view tree and open folders of the n-th nesting
    And Create folder with name "testFolder2" in "testFolder"
    And RELOAD
    And Create folder with name "testFolder3" in "testFolder2"
    And RELOAD
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And The user opens folder "testFolder2"
    And Spin is visible "Getting data..."
    And Upload file "TestUpload.txt" to "testFolder3"
    And User click Home button
    And Spin is visible "Getting data..."
    When The user open folders tree
    And The tree is contain "testFolder"
    And The user presses on arrow near "testFolder"
    And The tree is contain "testFolder, testFolder2"
    And The user presses on arrow near "testFolder2"
    And The tree is contain "testFolder, testFolder2, testFolder3"
    When User presses on "testFolder3" folder in the tree
    And Spin is visible "Getting data..."
    Then The user is located in "testFolder3"
    And The file "TestUpload.txt" is visible

  @positive
  Scenario: 3 The user can see the folder in the tree that was transferred to him in ownership
    And Register without UI user2
    And The "User1" sends a request to grant "owner" access to the "folder" "testFolder" to "User2"
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    And Create folder with name "testFolder2" in "testFolder"
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And The folder "testFolder2" is visible
    And The user opens folder "testFolder2"
    And Spin is visible "Getting data..."
    When The user press Upload a new file button
    And Choose the needed "TestUpload.txt" file from its PC directory
    And Spin is visible "Uploading file..."
    And Message "File created successful"
    And Login as new user 2 without UI
    And The user open folders tree
    And The tree is contain "testFolder"
    And The user presses on arrow near "testFolder"
    And The tree is contain "testFolder, testFolder2"
    When User presses on "testFolder2" folder in the tree
    And Spin is visible "Getting data..."
    Then The user is located in "testFolder2"
    And The file "TestUpload.txt" is visible

  @positive
  Scenario: 4 The folder appears in the tree after it is created
    And The user open folders tree
    And The tree is contain "testFolder"
    When Create folder with name "testFolder2" in root without UI
    And The user open folders tree
    Then The tree is contain "testFolder, testFolder2"

#    TODO: add "User can close folders tree, when click on "My Drive"




