@test_case_1.1
@registration
# ./node_modules/.bin/cypress-tags run -e TAGS='@'
Feature: Registration
  As a user (any role), I want to sign up in the system so that I can use it

  Background:
    Given The application is opened
    And there is no open session
    When The user press Register now button
    Then Sign Up form is open

  @positive
  Scenario: 1 Username can contain 2 uppercase letters
    Given User username field that contains 2 uppercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 2 Username can contain 2 lowercase letters
    Given User username field that contains 2 lowercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 3 Username can contain 20 lowercase letters
    Given User username field that contains 20 lowercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 4 Username can contain 20 uppercase letters
    Given User username field that contains 20 uppercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 5 Username can contain 3 uppercase letters
    Given User username field that contains 3 uppercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 6 Username can contain 3 lowercase letters
    Given User username field that contains 3 lowercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 7 Username can contain 19 uppercase letters
    Given User username field that contains 19 uppercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 8 Username can contain 19 lowercase letters
    Given User username field that contains 19 lowercase letters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format
#
  @positive
  Scenario: 9 Username can contain only numbers
    Given User username field that contains 9 numbers
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 10 Username can contain 10 letters in uppercase and lowercase
    Given User username field that contains 10 letters in uppercase and lowercase
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 11 Username can contain 1 letter in uppercase, 8 letters in lowercase and 1 number
    Given User username field that contains 1 letter in uppercase, 8 letters in lowercase and 1 number
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    And the data is valid
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

  @positive
  Scenario: 12 Username can not contain 2 words with uppercase and lowercase
    Given User username field that contains 2 words with uppercase and lowercase
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then Error notification about not correct name "Incorrect username!" is shown
    And User is not registered

  @positive
  Scenario: 13 Username can not contain 2 words with uppercase and lowercase and space after name
    Given User username field that contains 2 words with uppercase and lowercase and space after name
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then Error notification about not correct name "Incorrect username!" is shown
    And User is not registered

  @negative
  Scenario: 14 Username can not contain only 1 letter
    Given User username field that contain only 1 letter
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct name "Incorrect username!" is shown

  @negative
  Scenario: 15 Username can not contain 21 characters
    Given User username field that contain 21 characters
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct name "Incorrect username!" is shown

  @negative
  Scenario: 16 Username can not contain email
    Given User username field that contain email
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct name "Incorrect username!" is shown

  @negative
  Scenario: 17 Username can not contain only spaces
    Given User username field that contain only spaces
    And fills in the email field
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about empty username "Please enter your username!" is shown

  @negative @email
  Scenario: 18 Email can not contain 2 characters @@
    Given User fills in the username field
    And fills in the email field that contains the username, @@, and domain
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about not valid email "Invalid email address entered!" is shown

  @negative @email
  Scenario: 19 Email must contain @ and a domain name ("@gmail.com")
    Given User fills in the username field
    And fills in the email field that contain only username
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about not valid email "Invalid email address entered!" is shown

  @negative @email
  Scenario: 20 Email must contain a domain name (".com")
    Given User fills in the username field
    And fills in the email field that contain username, @, and servername
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about not valid email "Invalid email address entered!" is shown

  @negative @password
  Scenario: 21 Password and Confirm Password should be the same
    Given User fills in the username field
    And fills in the email field
    And fills in the password and repeat password fields with different data
    When The user press Sign up button
    Then User is not registered
    And Notification about different passwords "The two passwords that you entered do not match!" is shown

  @negative @password
  Scenario: 22 Password should contain min 1 character in uppercase
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field without characters in uppercase
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @negative @password
  Scenario: 23 Password should contain min 1 character in lowercase
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field without characters in lowercase
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @negative @password
  Scenario: 24 Password should contain min 1 number
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field without numbers
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown
#
  @negative @password
  Scenario: 25 Password should contain upper and lower case characters
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password that contain only numbers
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @negative @password
  Scenario: 26 Password can not contain only symbols
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password that contain only symbols
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @negative @one_field_empty
  Scenario: 27 User can not register without username
    Given fills in the email field
#    And field username is empty
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about empty username "Please enter your username!" is shown

  @negative @one_field_empty @BAG
  Scenario: 28 User can not register without email
    Given User fills in the username field
#    And field email is empty
    And fills in the password and confirm password field that contain 8 characters
    When The user press Sign up button
    Then User is not registered
    And Notification about empty email field "Please enter your email!" is shown

  @negative @one_field_empty @BAG
  Scenario: 29 User can not register without password
    Given User fills in the username field
    And fills in the email field
#    And field password is empty
    And fills in the confirm password field
    When The user press Sign up button
    Then User is not registered
    And Notification about empty password field "Please enter your password!" is shown
    And Notification about different passwords "The two passwords that you entered do not match!" is shown

  @negative @one_field_empty
  Scenario: 30 User can not register without confirm password
    Given User fills in the username field
    And fills in the email field
    And fills in the password field
#    And field confirm password is empty
    When The user press Sign up button
    Then User is not registered
    And Notification about empty confirm password field "Please confirm your password!" is shown

  @negative @BAG
  Scenario: 31 Form is not filled, negative case
    Given Sign Up form is open
    When The user press Sign up button
    Then User is not registered
    And Notification about empty username "Please enter your username!" is shown
    And Notification about empty email field "Please enter your email!" is shown
    And Notification about empty password field "Please enter your password!" is shown
    And Notification about empty confirm password field "Please confirm your password!" is shown

  @negative @password
  Scenario: 32 User can not register with password that contain 7 characters
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field that contain 7 characters
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @negative @password
  Scenario: 33 User can not register with password that contain 101 characters
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field that contain 101 characters
    When The user press Sign up button
    Then User is not registered
    And Error notification about not correct password "Incorrect password!" is shown

  @positive @password
  Scenario: 34 User can register with password that contain 100 characters
    Given User fills in the username field
    And fills in the email field
    And fills in the password and confirm password field that contain 100 characters
    When The user press Sign up button
    Then User is registered
    And The User got private key
    And The User got certificate in pem format

