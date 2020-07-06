@test_case_2.3
@uploading_folders
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.3'
Feature: Uploading files
  As an editor or owner of the folder, I want to upload a new file so that I can view, update or share it

  Rule: user should be registered

    Background:
      And Login as new user without UI

    Scenario: 1 User can upload txt file
#    And the user is located in his root folder or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed txt file from its PC directory
      Then The txt file is uploaded
      And Message "File created successful"
#    And The user is the owner of this file

    Scenario: 2 User can upload PNG file
#    And the user is located in his root folder or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed PNG file from its PC directory
      Then The txt file is uploaded
      And Message "File created successful"
#    And The user is the owner of this file

#  TODO will be available after implementing the version function:
#    Scenario: 3 User can not upload two files with the same name
##    And the user is located in his root folder or in the  folder where he has "Editors" rights
#      When The user press Upload a new file button
#      And Choose two files from PC directory with the same name
#      Then The user gets error notification "The file with this name already exists"
#      And The file is not uploaded

    Scenario: 4 User can upload 2 files with name "test" and different extension
#    And the user is located in his root folder or in the folder where he has "Editors" rights
      When The user press Upload a new file button
      And Choose the needed test.txt file from PC directory
      And The user press Upload a new file button
      And Choose the needed test.pem file from PC directory
      Then The txt and pem files are uploaded
#    And The user is the owner of this file