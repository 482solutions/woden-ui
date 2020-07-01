import {Given} from "cypress-cucumber-preprocessor/steps";

Given(/^Upload file "([^"]*)" to testFolder$/,  (fileName) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.contains('testFolder').dblclick()

    cy.wait('@getRootFolder').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')
      console.log('I\'m in testFolder')

      cy.server()
      cy.route('POST', '/api/v1/file').as('uploadFile')
      cy.contains('File Upload').click().wait(1000)

      cy.get(`input[type=file]`).attachFile('TestUpload.txt')
      cy.get('.ant-message-custom-content').as('spin').should('be.visible')
      cy.wait('@uploadFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-notice-content').should('be.visible')
        cy.contains('TestUpload.txt').should('be.visible')
      })
    })
  })
});
