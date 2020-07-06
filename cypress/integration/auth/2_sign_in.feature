@test_case_1.2
@sign_in

Feature: Sign in Feature
  As a user (any role), I want to sign in the system so that I can use it

  Rule: user should be registered before sign in.

    Background:
      Given The application is opened
      When there is no open session

    @positive
    Scenario: 1 Sign in function with username
      Given User has filled in the field valid username
      And filled valid password field
      And Pin cert
      And Pin privateKey
      When the user press Log in button
      And Spin is visible "Logging In..."
      Then User is signed in

    @positive
    Scenario: 2 Sign in function with email
      Given User has filled in the field valid email
      And filled valid password field
      And Pin cert
      And Pin privateKey
      When the user press Log in button
      And Spin is visible "Logging In..."
      Then User is signed in

    @negative
    Scenario Outline: 4 Sign in with invalid username and valid password
      Given User has filled invalid username <invUsername> in the field username from list
      And filled valid password field
      And Pin cert
      And Pin privateKey
      When the user press Log in button
      Then Error notification User not found is shown
      And User is not signed in
      Examples:
        | invUsername         |
        | invalidUsernameTest |
        | #$8-9&$)#           |
