@test_case_1.2
@sign_in

Feature: Sign in Feature
  As a user (any role), I want to sign in the system so that I can use it

  Rule: user should be registered before sign in.

#  Before('Register new user', function () {});

    @positive
    Scenario: 1 Sign in function with username
      Given The application is opened by user
      And there is no open session
      When User has filled in the field valid username
      And filled valid password field
      And the user press Sign in button
      Then User is signed in

    @positive
    Scenario: 2 Sign in function with email
      Given The application is opened by user
      And there is no open session
      When User has filled in the field valid email
      And filled valid password field
      And the user press Sign in button
      Then User is signed in

    @positive
    Scenario: 3 User can sign in with his credentials and certificate
      Given The application is opened by user
      And there is no open session
      And User field his credentials
      When Pined his certificate
      And the user press Sign in button
      Then User is signed in

    @negative
    Scenario Outline: 4 Sign in with invalid username and valid password
      Given The application is opened by user
      And there is no open session
      When User has filled invalid username <username> in the field username from list
      And filled valid password field
      And the user press Sign in button
      Then Error notification is shown
      And User is not signed in
      Examples:
        | username            |
        | invalidUsernameTest |
        | #$8-9&$)#           |

    @negative
    Scenario Outline: 5 Sign in with invalid password and valid username
      Given The application is opened by user
      And there is no open session
      When User has filled in the field valid username
      And filled invalid password <password> in the field password from list
      And the user press Sign in button
      Then Error notification is shown
      And User is not signed in
      Examples: invalid password
        | password                     |
        | 1                            |
        | asdasfadgasgdgdsgasgdhgad    |
        | 1231232413524214135234524124 |

    @negative
    Scenario Outline: 6 Sign in with invalid password and valid email
      Given The application is opened by user
      And there is no open session
      When User has filled in the field valid email
      And filled invalid password <password> in the field password from list
      And the user press Sign in button
      Then Error notification is shown
      And User is not signed in
      Examples: invalid Password
        | password           |
        | qaaqaqqaqaqaqaqa   |
        | AAAAAA             |
        | ++++++++++++++++++ |

    @negative
    Scenario: 7 User can not sign in if all fields are empty
      Given The application is opened by user
      And there is no open session
      When The user does not fill in the fields
      And The user press Sign in button
      Then Error notification is shown
      And User is not signed in




