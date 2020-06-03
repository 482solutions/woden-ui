@test_case_2.6
@viewing_list_of_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.6'

Feature:  Viewing previous version
  As a user (any role), I want to see a list of versions so that I can track the history of changes.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      And The user send "test_positive.txt" without UI
      And The "test_positive.txt" file is uploaded
      Then Upload new version of file "test_positive.txt"

    Scenario: 1 Viewing list of versions
#      Given The user has access to the file with any type of rights
      When The user press the Actions button in "test_positive.txt" file
      And The user press the Versions button in "test_positive.txt" file
      Then The popup versions is opened
#      Then The user sees the list of available versions and the time, date when the version was created

#    CID {{ CID_(cid) }}динамический
#    time - {{Time_(cid)}}динамический
#    download - Download_(cid) динамический
#    Закрыть попап - CloseVersionsModal