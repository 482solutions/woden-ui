@test_case_2.3
@uploading_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.3'
Feature: Uploading files
  As an editor or owner of the folder, I want to upload a new file so that I can view, update or share it

  Rule: user should be registered

    Background:
      Given Register without UI
      And Login as new user without UI

    @positive
    Scenario: 1 User can upload txt file
      Given Spin is visible "Getting data..."
      And The user is located in his root folder
#        or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed "txtFile.txt" file from its PC directory
      And Spin is visible "Uploading file..."
      Then The file "txtFile.txt" is uploaded
      And Message "File created successful"
#    And The user is the owner of this file

    @positive
    Scenario: 2 User can upload PNG file
      Given Spin is visible "Getting data..."
      And The user is located in his root folder
#      or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed "image.png" file from its PC directory
      And Spin is visible "Uploading file..."
      Then The file "image.png" is uploaded
      And Message "File created successful"
#    And The user is the owner of this file

    @negative
    Scenario: 3 cannot upload one file twice
      Given Spin is visible "Getting data..."
      And The user is located in his root folder
#    or in the  folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed "txtFile.txt" file from its PC directory
      And Spin is visible "Uploading file..."
      And Message "File created successful"
      And Choose the needed "txtFile.txt" file from its PC directory
      #  TODO:
#      Then The user gets error notification "The file with this name already exists"
#      And The file "txtFile.txt" is not uploaded

    @positive
    Scenario: 4 User can upload 2 files with the same name and different extension
      Given Spin is visible "Getting data..."
      And The user is located in his root folder
#    or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed "txtFile.txt" file from its PC directory
      And Spin is visible "Uploading file..."
      And The user press Upload a new file button
      And Choose the needed "txtFile.pem" file from its PC directory
      And Spin is visible "Uploading file..."
      Then The file "txtFile.txt" is uploaded
      And The file "txtFile.pem" is uploaded
#    And The user is the owner of this file