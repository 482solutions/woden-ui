import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';


Given(/^The application is opened$/, function () {
  cy.visit('/');
});

When(/^there is no open session$/, function () {
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

When(/^the user press Log in button$/, function () {
  cy.get('.ant-btn').as('Log in btn').click()
  cy.wait(1000)
});

Then(/^User is signed in$/, function () {
  cy.contains('Logout')
      .should('be.visible')
});

Then(/^User is not signed in$/, function () {
  cy.url().should('include', '/login');
});

Given(/^The user does not fill in the fields$/, function () {
  cy.get('#name').should('be.empty');
  cy.get('#password').should('be.empty');
});

Then(/^Error notification User not found is shown$/, function () {
  cy.contains('User not found').should('be.visible')
});

Then(/^Error notification is shown Invalid password supplied$/, function () {
  cy.contains('Invalid password supplied').should('be.visible')
});

Then(/^Error message Username can not be empty$/, function () {
  cy.contains('Username can not be empty').should('be.visible')
});

Then(/^Error message Password can not be empty$/, function () {
  cy.contains('Password can not be empty').should('be.visible')
});