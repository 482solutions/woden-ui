@test_case_3.8
@view_access_list

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.8'

Feature: Owner revoke access
  As an owner of the file (folder), I want to have "Revoke access"
  functionality so that I can revoke access to my file or folder of any user.

  Background:
    Given Register without UI
    And Register without UI user2
#    And Register without UI user3
    And Login as new user without UI
    And Spin is visible "Getting data..."

  @positive
  Scenario: 1 Owner can revoke edit access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"

#    TODO: delete login and spin after fix reload on the frontend
    And Login as new user without UI
    And Spin is visible "Getting data..."

    And The user press the Actions button in "TestUpload.txt" file
    And The user press the Access list button in "TestUpload.txt" file
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."

#    Then The "User1" is the "owner" in access list
#    And The "User2" is the "viewer" in access list
#    And Login as new user 2 without UI
#    And The user open Shared with me
#    And Spin is visible "Getting data..."
#    And The file "TestUpload.txt" is visible
#    And The user press the Actions button in "TestUpload.txt" file
#    And Button "Update File" "not.be.visible"
