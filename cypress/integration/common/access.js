import {Then} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../support/commands";

Then(/^User has Editors rights to "([^"]*)" "([^"]*)"$/, (fileName, obj) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    switch (obj) {
      case 'file':
        const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'));
        cy.get(`#Actions_${hashFile}`).click().wait(1000);
        cy.get(`#Update_${hashFile}`).click().wait(1000);
        cy.server();
        cy.route('PUT', '/api/v1/file').as('updateFile');
        cy.get(`#Update_${hashFile} input[type=file]`).attachFile(fileName);
        cy.get('.ant-message-notice-content').should('be.visible');

        cy.wait('@updateFile').then((xhr) => {
          expect(xhr.responseBody).to.not.have.property('stack');
          cy.get('.ant-message-custom-content').as('File updated successfully')
            .should('be.visible')
            .should("contain.text", 'File updated successfully');
        });
        break;
      case 'folder':
        cy.contains('File Upload').click().wait(1000)
        cy.server()
        cy.route('POST', '/api/v1/file').as('uploadFile')

        cy.get(`input[type=file]`).attachFile('TestUpload.txt');
        cy.get('.ant-message-notice-content').should('be.visible')

        cy.wait('@uploadFile').then((xhr) => {
          expect(xhr.responseBody).to.not.have.property('stack')
          cy.get('.ant-message-custom-content').as('spin')
            .should('be.visible')
          cy.contains('TestUpload.txt').should('be.visible')
        })
        break;
    }
  })
});

