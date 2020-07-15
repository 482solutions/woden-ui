import {Given} from "cypress-cucumber-preprocessor/steps";

Given(/^Upload file "([^"]*)" to "([^"]*)"$/,  (fileName, folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.contains(folder).dblclick()

    cy.wait('@getFolder').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')
      console.log('I\'m in testFolder')

      cy.server()
      cy.route('POST', '/api/v1/file').as('uploadFile')
      cy.contains('File Upload').click().wait(1000)

      cy.get(`input[type=file]`).attachFile(fileName)
      cy.get('.ant-message-custom-content').as('spin').should('be.visible')
      cy.wait('@uploadFile').then((xhr) => {
        Cypress.env('filesInRoot', xhr.responseBody.folder.files)
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-notice-content').should('be.visible')
        cy.contains(fileName).should('be.visible')
      })
    })
  })
});
