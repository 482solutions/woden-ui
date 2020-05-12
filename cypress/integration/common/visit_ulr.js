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

