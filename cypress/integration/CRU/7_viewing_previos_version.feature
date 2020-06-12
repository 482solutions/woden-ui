@test_case_2.7
@viewing_previous_versions
# ./node_modules/.bin/cypress-tags run -e TAGS='@test_case_2.7'

Feature:  Viewing previous version
  As a user (any role), I want to see any available version so that I can check what was changed.

  Rule: user should be registered.

    Background: Create a user before starting the tests
      Given Login as new user without UI
      And Upload file "test_positive"
      Then The user updating file
      And Upload new version of file
      And Latest version of file is shown on user's dashboard

    Scenario: 1 Viewing previous version
      Given The user sees the list of available versions
      When The user press on any version
      Then The User downloads chosen version