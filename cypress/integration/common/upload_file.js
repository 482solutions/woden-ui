import {Given} from "cypress-cucumber-preprocessor/steps";

Given(/^Upload file "([^"]*)" to "([^"]*)"$/,  (fileName, folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.contains(folder).dblclick()

    cy.wait('@getFolder').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')

      cy.server()
      cy.route('POST', '/api/v1/file').as('uploadFile')
      cy.contains('File Upload').click().wait(100)

      cy.get(`input[type=file]`).attachFile(fileName)
      cy.get('.ant-message-custom-content').as('spin').should('be.visible')
      cy.wait('@uploadFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        Cypress.env('filesInRoot', xhr.responseBody.folder.files)
        cy.get('.ant-message-notice-content')
          .should('be.visible')
          .and('contain.text', 'File created successfully')
      })
    })
  })
});
