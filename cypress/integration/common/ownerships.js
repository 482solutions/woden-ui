import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getHashFromFolder} from "../../support/commands";

Given(/^Enter "([^"]*)" email to field "([^"]*)"$/, (userEmail, field) => {
  switch (userEmail) {
    case 'User1':
      userEmail = Cypress.env('email');
      break;
    case 'User2':
      userEmail = Cypress.env('email_2');
      break;
    case 'User3':
      userEmail = Cypress.env('email_3');
      break;
    case 'spaces':
      userEmail = '      ';
      break;
    case 'UsernameUser':
      userEmail = Cypress.env('login');
      break;
    case 'UsernameUser2':
      userEmail = Cypress.env('login_2');
      break;
    case 'UsernameUser3':
      userEmail = Cypress.env('login_3');
      break;
    case 'nothing':
      userEmail = '';
      break;
    case 'User2 and User3':
      userEmail = `${Cypress.env('email_2')}, ${Cypress.env('email_3')}`;
      break;
  }
  cy.get(field).should('be.visible').type(userEmail)
});

Then(/^"([^"]*)" option from pop-up window is not visible$/,  () => {
  cy.get('#form_in_modal_permissions').should('not.be.visible')
});

Given(/^Choose the "([^"]*)" option from pop-up window$/, (option) => {
  cy.get('.ant-modal-header').should('be.visible')
  cy.get('#form_in_modal_permissions').should('be.visible').click().wait(1000)
  cy.contains(option).click(1000)
});

Given(/^Press "([^"]*)"$/, (button) => {
  cy.server()
  cy.route('PUT', '/api/v1/permissions').as('permissions')
  cy.contains(button).click()
});

Then(/^Message about transfer ownership "([^"]*)"$/, (text) => {
  cy.wait('@permissions').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr)
    cy.get('.ant-message-notice-content').should('contain.text', text)
  })
});

Then(/^Notification below the field "([^"]*)"$/, (text) => {
  cy.get('.ant-form-item-explain').should('contain.text', text)
});

Then(/^Warning message "([^"]*)"$/, (message) => {
  cy.wait('@permissions').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(message)
      .should('be.visible')
      .should("contain.text", message)
  })
});

Then(/^Error message "([^"]*)"$/, (message) => {
  cy.wait('@permissions').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(message)
      .should('be.visible')
      .should("contain.text", message)
  })
});

Given(/^The user 1 is the owner of the file$/, () => {
  cy.wait('@uploadFile').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

When(/^Enter User 2 username$/,  () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('login_2'))
});

Then(/^The folder "([^"]*)" is visible$/,  () => {
  cy.contains('testFolder').should('be.visible')
});

Then(/^Folder "([^"]*)" is visible$/,  (folder) => {
  cy.contains(folder).should('be.visible')
});
Then(/^The user opens the shared folder "([^"]*)"$/, (folder) => {
  cy.contains(folder).dblclick()
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});
