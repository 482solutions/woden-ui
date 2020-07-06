import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

Then(/^The user sees the access list$/,  () => {
  cy.get('#AccessList').should('be.visible')
});

Then(/^The "([^"]*)" is the "([^"]*)" in access list$/,  (user, access) => {
  switch (user) {
    case 'User1':
      user = Cypress.env('login');
      break;
    case 'User2':
      user = Cypress.env('login_2');
      break;
    case 'User3':
      user = Cypress.env('login_3');
      break;
  }switch (access) {
    case 'owner':
      cy.get('.ownerName').should('contain.text', user)
      break;
    case 'editor':
      cy.get('.sharedUser.editor').should('contain.text', user)
      break;
    case 'viewer':
      cy.get('.sharedUser.viewer').should('contain.text', user)
      break;
  }

});
