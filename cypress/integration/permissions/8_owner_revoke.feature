@test_case_3.8
@view_access_list

  # ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_3.8'

Feature: Owner revoke access
  As an owner of the file (folder), I want to have "Revoke access"
  functionality so that I can revoke access to my file or folder of any user.

  Background:
    Given Register without UI
    And Register without UI user2
    And Login as new user without UI
    And Spin is visible "Getting data..."

  @positive
  Scenario: 1 Owner can revoke edit access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"

  @positive
  Scenario: 2 Owner can revoke view access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is not visible

  @positive
  Scenario: 3 Owner can revoke edit access for a folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user press the "Actions" button in "Revoke" "folder"
    And Button "Share " "not.be.visible"
    And The user opens folder "Revoke"
    And Button "New Folder" "not.be.visible"
    And Button "File Upload" "not.be.visible"

  @positive
  Scenario: 4 Owner can revoke view access for a folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "view" access to the "folder" "Revoke" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke" is not visible

  @negative
  Scenario: 5 Viewer can not revoke access for a file
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    Then Button "Revoke access" "not.be.visible"

  @negative
  Scenario: 6 Viewer can not revoke access for a folder
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "view" access to the "folder" "Revoke" to "User2"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user press the "Actions" button in "Revoke" "folder"
    When The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    Then Button "Revoke access" "not.be.visible"

  @negative
  Scenario: 7 Owner can revoke edit access for a file in folder
    And Create folder with name "Revoke" in root without UI
    And Upload file "TestUpload.txt" to "Revoke"
    And The file "TestUpload.txt" is visible
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user opens folder "Revoke"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The user press the back button
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And Upload file "test.pem" to "Revoke"
    And The file "test.pem" is visible
    And The file "TestUpload.txt" is visible
    And User can update file "test.pem"
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And Button "Update File" "not.be.visible"

  @positive
  Scenario: 8 Owner can revoke edit access for a folder in folder
    And Create folder with name "Revoke1" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke1" to "User2"
    And Create folder with name "Revoke2" in "Revoke1"
    And RELOAD
    And The folder "Revoke1" is visible
    And The user opens folder "Revoke1"
    And Spin is visible "Getting data..."
    And The folder "Revoke2" is visible
    And The user press the "Actions" button in "Revoke2" "folder"
    And The user press the "Access list" button in "Revoke2" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The user press the back button
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke1" "folder"
    And The user press the "Access list" button in "Revoke1" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The user opens folder "Revoke1"
    And Spin is visible "Getting data..."
    And The folder "Revoke2" is visible
    And The user press the "Actions" button in "Revoke2" "folder"
    And The user press the "Access list" button in "Revoke2" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke1" is visible
    And The user opens folder "Revoke1"
    And Spin is visible "Getting data..."
    And The folder "Revoke2" is visible

  @positive
  Scenario: 9 Owner can revoke all access for a file in folder
    And Create folder with name "Revoke" in root without UI
    And Upload file "TestUpload.txt" to "Revoke"
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And The user press the back button
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    And The user opens folder "Revoke"
    And The file "TestUpload.txt" is visible
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    Then The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    And The folder "Revoke" is visible
    And The user opens folder "Revoke"
    And Spin is visible "Getting data..."
    And The file "TestUpload.txt" is not visible

  @positive
  Scenario: 10 After revoking the editing rights for a file, the owner can restore them
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "edit" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The file "TestUpload.txt" is visible
    And Count of the "file" "TestUpload.txt" should be 1
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list

  @positive
  Scenario: 11 After revoking the viewing rights for a file, the owner can restore them
    And The user upload "TestUpload.txt" without UI
    And The "User1" sends a request to grant "view" access to the "file" "TestUpload.txt" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Access list" button in "TestUpload.txt" "file"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    When The user press the "Actions" button in "TestUpload.txt" "file"
    And The user press the "Share" button in "TestUpload.txt" "file"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The file "TestUpload.txt" is visible
    And Count of the "file" "TestUpload.txt" should be 1

  @positive
  Scenario: 12 After revoking the editor rights for a folder, the owner can restore them
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list
    When The user press the "delete" button near "editor" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    And The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    When The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Share" button in "Revoke" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View and Update" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "Revoke" is visible
    And Count of the "folder" "Revoke" should be 1
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "editor" in access list

  @positive
  Scenario: 13 After revoking the viewing rights for a folder, the owner can restore them
    And Create folder with name "Revoke" in root without UI
    And The "User1" sends a request to grant "view" access to the "folder" "Revoke" to "User2"
    And Login as new user without UI
    And Spin is visible "Getting data..."
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list
    When The user press the "delete" button near "viewer" "User2"
    And Spin is visible "Revoking access..."
    And The "User1" is the "owner" in access list
    And The "User2" is the "absent" in access list
    When The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Share" button in "Revoke" "folder"
    And Enter "User2" email to field "#form_in_modal_username"
    And Choose the "View Only" option from pop-up window
    And Press "Confirm"
    And Spin is visible "Changing permissions..."
    And Message about transfer ownership "Permissions updated successfully"
    And Login as new user 2 without UI
    And The user open Shared with me
    And Spin is visible "Getting data..."
    Then The folder "Revoke" is visible
    And Count of the "folder" "Revoke" should be 1
    And The user press the "Actions" button in "Revoke" "folder"
    And The user press the "Access list" button in "Revoke" "folder"
    And The user sees the access list
    And The "User1" is the "owner" in access list
    And The "User2" is the "viewer" in access list

#  @positive TODO
#  Scenario: 14 Owner can revoke access for a file which was created by the editor
#    And Create folder with name "Revoke" in root without UI
#    And The "User1" sends a request to grant "edit" access to the "folder" "Revoke" to "User2"
#    And Login as new user 2 without UI
#    And The user open Shared with me
#    And Spin is visible "Getting data..."
#    And "User2" has Editors rights to "Revoke" "folder"
#    And Login as new user 2 without UI
#    And The user open Shared with me
#    And Spin is visible "Getting data..."
#    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
#    And The user press the "Actions" button in "test.pem" "file"
#    And The user press the "Share" button in "test.pem" "file"
#    And Register without UI user3
#    And Enter "User3" email to field "#form_in_modal_username"
#    And Choose the "View Only" option from pop-up window
#    And Press "Confirm"
#    And Spin is visible "Changing permissions..."
#    And Message about transfer ownership "Permissions updated successfully"
#    And Login as new user without UI
#    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
#    And The user press the "Actions" button in "test.pem" "file"
#    And The user press the "Access list" button in "test.pem" "file"
#    And The user sees the access list
#    And The "User1" is the "owner" in access list
#    And The "User2" is the "editor" in access list
#    And The "User3" is the "viewer" in access list
#    When The user press the "delete" button near "editor" "User2"
#    And Spin is visible "Revoking access..."
#    And The "User1" is the "owner" in access list
#    And The "User2" is the "viewer" in access list
#    And The "User3" is the "viewer" in access list
#    When The user press the "delete" button near "viewer" "User2"
#    And Spin is visible "Revoking access..."
#    And Login as new user 2 without UI
#    And Spin is visible "Getting data..."
#    And The user open Shared with me
#    And Spin is visible "Getting data..."
#    And The user press the "Actions" button in "Revoke" "folder"
#    And The user press the "Access list" button in "Revoke" "folder"
#    And The "User1" is the "owner" in access list
#    And The "User2" is the "editor" in access list
#    And The "User3" is the "absent" in access list
#    And The user opens folder "Revoke"
#    And Spin is visible "Getting data..."
#    And The user press the "Actions" button in "test.pem" "file"
#    And The user press the "Access list" button in "test.pem" "file"
#    And The "User1" is the "owner" in access list
#    And The "User2" is the "absent" in access list
#    And The "User3" is the "viewer" in access list
#    And The user double click the file
#    And Spin is visible "Downloading file..."
#    And Notification error "User does not have permission"
##    User 2 has editor rights for a folder but, owner revoked his access for a file inside the folder
##  User open folder, and try to download file. File is downloaded, but user is absent in file's access list

