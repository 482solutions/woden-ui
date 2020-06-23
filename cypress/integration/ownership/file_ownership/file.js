import {Given, Then} from 'cypress-cucumber-preprocessor/steps';
import {getHashFromFile} from "../../../support/commands";


Given(/^The user 1 is the owner of the file$/, () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

Then(/^User 2 became Owner of "([^"]*)" file$/, (file) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr.responseBody)
    expect(1).to.equal(xhr.responseBody.folder.files.length)
    cy.contains(file).should('be.visible')
  })
});

Then(/^User 1 has Editors rights to "([^"]*)" file$/, (fileName) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')

    cy.get('.shared').click()

    const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))
    cy.get(`#Actions_${hashFile}`).click().wait(1000)
    cy.get(`#Update_${hashFile}`).click().wait(1000)
    cy.server()
    cy.route('PUT', '/api/v1/file').as('updateFile')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(fileName);
    cy.get('.ant-message-notice-content').should('be.visible')

    cy.wait('@updateFile').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')
      cy.get('.ant-message-custom-content').as('File updated successfully')
        .should('be.visible')
        .should("contain.text", 'File updated successfully')
    })
  })
});







