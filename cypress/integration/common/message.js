import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

When(/^Message "([^"]*)"$/, (messageText) => {
  cy.wait('@uploadFile').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(messageText)
      .should('be.visible')
      .should("contain.text", messageText)
  })
});
