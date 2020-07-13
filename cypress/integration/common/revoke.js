import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

When(/^The user press the "([^"]*)" button near "([^"]*)" "([^"]*)"$/, (btn, access, user) => {
  const logins = {
    User1: Cypress.env('login'),
    User2: Cypress.env('login_2'),
    User3: Cypress.env('login_3'),
  }
  user = logins[user];
  switch (access) {
    case 'editor':
      cy.get('.sharedUser.editor').should('contain.text', user)
      cy.get('.sharedUser.editor').children('.permissionIcons').children('.revokeAccess').click()
      break;
    case 'viewer':
      cy.get('.sharedUser.viewer').should('contain.text', user)
      cy.get('.sharedUser.viewer').children('.permissionIcons').children('.revokeAccess').click()
      break;
  }
});
