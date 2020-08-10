@test_case_3.7
@view_access_list

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.7'

Feature:  View access list
  As a user (any role), I want to see who has access to the file or
  folder so that I can manage the list.

  Background:
    Given Register without UI
    And Register without UI user2
    And Register without UI user3
    And Login as new user without UI

  @positive
  Scenario: 1 View file access list by owner
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 2 View file access list by editor
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "be.visible"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 3 View file access list by viewer
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 4 View file access list by owner with some viewers
    And The user upload "TestUpload.txt" without UI
    And The user 1 is the owner of the file
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 5 View folder access list by owner
    And Create folder with name "Access" in root without UI
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Access" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And The user press the "Actions" button in "Access" "folder"
    And The user press the "Access list" button in "Access" "folder"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 6 View folder access list by editor
    And Create folder with name "Access" in root without UI
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Access" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And The user press the "Actions" button in "Access" "folder"
    And The user press the "Access list" button in "Access" "folder"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 7 View folder access list by viewer
    And Create folder with name "Access" in root without UI
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Access" is visible
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"
    And The user press the "Actions" button in "Access" "folder"
    And The user press the "Access list" button in "Access" "folder"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 8 View folder access list by owner with some viewers
    And Create folder with name "Access" in root without UI
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Share" button in "Access" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    When The user press the "Actions" button in "Access" "folder"
    And The user press the "Access list" button in "Access" "folder"
    Then The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The "User3" is the "viewer" in access list

  @positive
  Scenario: 9 Editor can create folder2 in the shared folder1, and the owner of folder2 will be the owner of folder1
    Given Create folder with name "testFolder" in root without UI
    And The user press the "Actions" button in "testFolder" "folder"
    And The user press the "Share" button in "testFolder" "folder"
    And Enter "User2" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "testFolder" is visible
    When Create folder with name "testFolder2" in "testFolder"
    And The user opens folder "testFolder"
    And Spin is visible "Getting data..."
    And The folder "testFolder2" is visible
    And The user press the "Actions" button in "testFolder2" "folder"
    And The user press the "Access list" button in "testFolder2" "folder"
    And The user sees the access list
    Then The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list


