// eslint-disable-next-line import/no-extraneous-dependencies
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

// https://www.npmjs.com/package/generate-password
let login;
let email;
let password;

beforeEach(() => {
  login = generator.generate({});
  email = `${login.toLowerCase()}@gmail.com`;
  password = `${login}12345`;
});

Given(/^User username field that contains 2 uppercase letters$/, () => {
  login = generator.generate({
    length: 20,
    lowercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 2 lowercase letters$/, () => {
  login = generator.generate({
    length: 2,
    uppercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 20 lowercase letters$/, () => {
  login = generator.generate({
    length: 20,
    uppercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 20 uppercase letters$/, () => {
  login = generator.generate({
    length: 20,
    lowercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 3 uppercase letters$/, () => {
  login = generator.generate({
    length: 3,
    lowercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 3 lowercase letters$/, () => {
  login = generator.generate({
    length: 3,
    uppercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 19 uppercase letters$/, () => {
  login = generator.generate({
    length: 19,
    lowercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 19 lowercase letters$/, () => {
  login = generator.generate({
    length: 19,
    uppercase: false,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 9 numbers$/, () => {
  login = generator.generate({
    length: 9,
    lowercase: false,
    uppercase: false,
    numbers: true,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 10 letters in uppercase and lowercase$/, () => {
  login = generator.generate({
    length: 10,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contains 1 letter in uppercase, 8 letters in lowercase and 1 number$/, () => {
  const name = generator.generate({
    length: 8,
    uppercase: false,
  });
  const num = generator.generate({
    length: 1,
    uppercase: false,
    lowercase: false,
    numbers: true,
  });
  login = `A${name}${num}`;
  cy.get('#name').type(login);
});

Given(/^User username field that contains 2 words with uppercase and lowercase$/, () => {
  const name = generator.generate({
    length: 5,
  });
  login = `${name} ${name}`;
  cy.get('#name').type(login);
});

Given(/^User username field that contains 2 words with uppercase and lowercase and space after name$/, () => {
  const name = generator.generate({
    length: 6,
  });
  login = ` ${name} ${name}`;
  cy.get('#name').type(login);
});

Given(/^User username field that contain only 1 letter$/, () => {
  login = generator.generate({
    length: 1,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contain 21 characters$/, () => {
  login = generator.generate({
    length: 21,
  });
  cy.get('#name').type(login);
});

Given(/^User username field that contain email$/, () => {
  const name = generator.generate({
    length: 5,
  });
  login = `${name}@gmail.com`;
  cy.get('#name').type(login);
});

Given(/^User username field that contain only spaces$/, () => {
  login = '             ';
  cy.get('#name').type(login);
});

Given(/^User fills in the username field$/, () => {
  cy.get('#name').type(login);
  cy.contains('Incorrect Username')
      .as('Message Incorrect Username')
      .should('not.be.visible');
});

Given(/^fills in the email field$/, () => {
  cy.get('#email').type(email);
});

Given(/^fills in the password and confirm password field that contain 8 characters$/, () => {
  const passw = generator.generate({
    length: 4,
    uppercase: true,
    lowercase: true,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(`${passw}1234Zz`);
  cy.get('#confirm').type(`${passw}1234Zz`);
});

Given(/^the data is valid$/, () => {
  cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(3) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(4) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(5) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
});


Then(/^User is not registered$/, () => {
  cy.url().should('include', '/registration');
});

Then(/^Error notification about not correct name "([^"]*)" is shown$/, (invalidUsername) => {
  cy.get('.ant-form-item-explain > div').as(invalidUsername)
    .should('be.visible')
    .should('contain.text', invalidUsername);
});

Then(/^Notification about empty username "([^"]*)" is shown$/, (emptyUsername) => {
  cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').as(emptyUsername)
    .should('be.visible')
    .should('contain.text', emptyUsername);
});


Given(/^fills in the email field that contains the username, @@, and domain$/, () => {
  cy.get('#email').type(`${login.toLowerCase()}@@gmail.com`);
});

Then(/^Notification about not valid email "([^"]*)" is shown$/, (invalidEmail) => {
  cy.get('.ant-form-item-explain').as(invalidEmail)
    .should('be.visible')
    .should('contain.text', invalidEmail);
});

Given(/^fills in the email field that contain only username$/, () => {
  cy.get('#email').type(login.toLowerCase());
});


Given(/^fills in the email field that contain username, @, and servername$/, () => {
  cy.get('#email').type(`${login.toLowerCase()}@.com`);
});

Given(/^fills in the password and repeat password fields with different data$/, () => {
  const anotherPassw = generator.generate({
    length: 8,
    numbers: true,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(password);
  cy.get('#confirm').type(anotherPassw);
  expect(password).not.eq(anotherPassw);
});

Then(/^Notification about different passwords "([^"]*)" is shown$/, (differentPassw) => {
  cy.get(':nth-child(5) > .ant-col > .ant-form-item-explain > div').as(differentPassw)
    .should('be.visible')
    .should('contain.text', differentPassw);
});


Given(/^fills in the password and confirm password field without characters in uppercase$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: true,
    uppercase: false,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Then(/^Error notification about not correct password "([^"]*)" is shown$/, (incorrectPassw) => {
  cy.contains(incorrectPassw).as(incorrectPassw)
    .should('be.visible')
    .should('contain.text', incorrectPassw);
});

Given(/^fills in the password and confirm password field without characters in lowercase$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: true,
    uppercase: false,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Given(/^fills in the password and confirm password field without numbers$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: false,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Given(/^fills in the password and confirm password that contain only numbers$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: true,
    lowercase: false,
    uppercase: false,
    // symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Given(/^fills in the password and confirm password that contain only symbols$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: false,
    lowercase: false,
    uppercase: false,
    symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Then(/^Notification about empty email field "([^"]*)" is shown$/, (emptyEmail) => {
  cy.get(':nth-child(3) > .ant-col > .ant-form-item-explain > div').as(emptyEmail)
    .should('be.visible')
    .should('contain.text', emptyEmail);
});

Given(/^fills in the confirm password field$/, () => {
  cy.get('#confirm').type(password);
});

Then(/^Notification about empty password field "([^"]*)" is shown$/, (emptyPassw) => {
  cy.get(':nth-child(4) > .ant-col > .ant-form-item-explain > div').as(emptyPassw)
    .should('be.visible')
    .should('contain.text', emptyPassw);
});
Given(/^fills in the password field$/, () => {
  cy.get('#password').type(password);
});

Then(/^Notification about empty confirm password field "([^"]*)" is shown$/, (emptyConfPassw) => {
  cy.get(':nth-child(5) > .ant-col > .ant-form-item-explain > div').as(emptyConfPassw)
    .should('be.visible')
    .should('contain.text', emptyConfPassw);
});

Given(/^fills in the password and confirm password field that contain 7 characters$/, () => {
  const passw = generator.generate({
    length: 7,
    numbers: true,
    symbols: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});

Given(/^fills in the password and confirm password field that contain 101 characters$/, () => {
  const passw = generator.generate({
    length: 100,
    numbers: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw + '!');
  cy.get('#confirm').type(passw + '!');
});

Given(/^fills in the password and confirm password field that contain 100 characters$/, () => {
  const passw = generator.generate({
    length: 99,
    numbers: true,
    exclude: /['"`]/,
  });
  cy.get('#password').type(passw+ '!');
  cy.get('#confirm').type(passw+ '!');
});

When(/^The user press Sign up button$/, () => {
  cy.server()
  cy.route('POST', '/api/v1/user').as('getCert')
  cy.get('.ant-btn').as('SignUpNow').click()
});

Then(/^User is registered$/, () => {
  cy.get('.ant-message-custom-content').as('message valid registration')
    .should('be.visible')
    .should('contain.text', 'Registration was successful');
});


Then(/^Error notification "([^"]*)" is shown$/, (message) => {
  cy.get('.ant-message-custom-content').as('messageIncorrectUsername')
    .should('be.visible')
    .should('contain.text', message)
});

