// eslint-disable-next-line import/no-extraneous-dependencies
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

// const baseURL = 'http://localhost:3000/login';
// https://www.npmjs.com/package/generate-password
let login;
// eslint-disable-next-line no-unused-vars
let email;
// eslint-disable-next-line no-unused-vars
let password;
// eslint-disable-next-line no-undef
beforeEach(() => {
  login = generator.generate({});
  email = `${login.toLowerCase()}@gmail.com`;
  password = generator.generate({
    numbers: true,
    symbols: true,
  });
});

Given(/^The application is opened$/, () => {
  cy.visit('/');
});

Given(/^there is no open session$/, () => {
  // eslint-disable-next-line cypress/no-assigning-return-values
  const cookie = cy.getCookies().should('have.length', 0);
  if (cookie.length !== 0) {
    cy.clearCookies();
  }
});

When(/^The user press Register now button$/, () => {
  cy.get('.ant-col-offset-2 > a').click();
});

Then(/^Sign Up form is open$/, () => {
  cy.get('.ant-form').should('be.visible');
});

Given(/^User username field that contains 2 uppercase letters$/, () => {
  login = generator.generate({
    length: 2,
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
});

Given(/^fills in the email field$/, () => {
  cy.get('#email').type(email);
});

Given(/^fills in the password and confirm password field that contain 8 characters$/, () => {
  const passw = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
  });
  cy.get('#password').type(passw);
  cy.get('#confirm').type(passw);
});
Given(/^the data is valid$/, () => {
  cy.get(':nth-child(2) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(3) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(4) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
  cy.get(':nth-child(5) > .ant-col > .ant-form-item-explain > div').should('not.be.visible');
});

When(/^The user press Sign up button$/, () => {
  cy.get('.ant-btn').as('SignUpNow').click();
});
