import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^Enter User 2 email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('email_2'))
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

When(/^Enter spaces in field email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type('       ')
});

When(/^Enter username of user2 in field email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('login_2'))
});

Then(/^Notification below the field "([^"]*)"$/, (text) => {
  cy.get('.ant-form-item-explain').should('contain.text', text)
});

When(/^Field email is empty$/, () => {
  cy.get('#form_in_modal_username').should('be.empty')
});

When(/^Enter email user2 and user3 in field "([^"]*)"$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(`${Cypress.env('email_2')}, ${Cypress.env('email_3')}`)
});

When(/^Enter email user 1$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('email'))
});

Then(/^Warning message "([^"]*)"$/, (message) => {
  cy.wait('@permissions').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(message)
      .should('be.visible')
      .should("contain.text", message)
  })
});

Given(/^Enter "([^"]*)"$/, (invalidEmail) => {
  cy.get('#form_in_modal_username').should('be.visible').type(invalidEmail)
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
  cy.wait('@getFolder').then((xhr) => {
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
