@test_case_3.9
@view_access_list

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.9'

Feature: Editor revoke access
  Description: As an editor of the file (folder), I want to have "Revoke access"
  functionality so that I can revoke access to the file or folder of any editor or viewer (except owner).

  Background:
    Given Register without UI
    And Register without UI user2
    And Register without UI user3
    And Login as new user without UI
#    And Spin is visible "Getting data..."

  @positive
  Scenario: 1 Editor can revoke edit access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User2" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    When The user press the "delete" button near "editor" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "be.visible"

  @positive
  Scenario: 2 Editor can revoke view access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User2" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is not visible

  Scenario: 3 Editor can revoke edit access for a folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And Login as new user 2 without UI
    And The "User2" sends a request to grant "edit" access to the "folder" "Revoke" to "User3"
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    When The user press the "delete" button near "editor" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user press the "Actions" button in "Revoke" "folder"
    And Button "Share " "not.be.visible"
    And The user opens folder "Revoke"
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  Scenario: 4 Editor can revoke view access for a folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And Login as new user 2 without UI
    And The "User2" sends a request to grant "view" access to the "folder" "Revoke" to "User3"
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is not visible

  @positive
  Scenario: 5 Editor can revoke edit access for a file in folder
    And Create folder with name "Revoke" in root without UI
    And Upload file "TestUpload.txt" to "Revoke"
    And The file "TestUpload.txt" is visible
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user 2 without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User3"
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    When The user press the "delete" button near "editor" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is not visible
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"

  @positive
  Scenario: 6 Editor can revoke edit access for a folder in folder
    And Create folder with name "Revoke1" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke1" to "User2"
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke1" to "User3"
    And Create folder with name "Revoke2" in "Revoke1"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user opens folder "Revoke1"
    And The user press the "Actions" button in "Revoke2" "folder"
    And The user press the "Access list" button in "Revoke2" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    When The user press the "delete" button near "editor" "User3"
    And Spin is visible "Revoking access..."
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user opens folder "Revoke1"
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke2" "folder"
    And The user press the "Access list" button in "Revoke2" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    Then The "User3" is the "viewer" in access list

  Scenario: 7 Editor can revoke view access for a file in folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And The "User1" sends a request to grant "view" access to the "folder" "Revoke" to "User3"
    And Upload file "TestUpload.txt" to "Revoke"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
    Then The file "TestUpload.txt" is visible

  Scenario: 8 After revoking the viewing rights for a file, the editor can restore them
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
#    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    Then The "User3" is the "viewer" in access list

  Scenario: 9 After revoking the editor rights for a file, the editor can restore them
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    And The user press the "delete" button near "editor" "User3"
#    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 3 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list

  Scenario: 10 After revoking the viewing rights for a folder, the editor can restore them
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And The "User1" sends a request to grant "view" access to the "folder" "Revoke" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User3"
#    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "absent" in access list
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Share" button in "Revoke" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list

  Scenario: 11 After revoking the editor rights for a folder, the editor can restore them
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list
    When The user press the "delete" button near "editor" "User3"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "viewer" in access list
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Share" button in "Revoke" "folder"
    And Enter "User3" email to field "#form_in_modal_email"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The "User3" is the "editor" in access list

  Scenario: 12 Editor doesn't have remove button near himself in access list
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
#    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And Upload file "TestUpload.txt" to "Revoke"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    Then The button revoke access is not visible near editor "User2"



