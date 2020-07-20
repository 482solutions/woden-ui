import {Then} from "cypress-cucumber-preprocessor/steps";
import {getHash} from "../../support/commands";

Then(/^"([^"]*)" has Editors rights to "([^"]*)" "([^"]*)"$/, (user, name, obj) => {
  const logins = {
    User1: 'TestUpload.txt',
    User2: 'test.pem',
    User3: 'txtFile.pem',
  }
  user = logins[user];
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    switch (obj) {
      case 'file':
        const hashFile = getHash(name, Cypress.env('filesInRoot'));
        cy.get(`#Actions_${hashFile}`).click().wait(2000);
        cy.get(`#Update_${hashFile}`).click().wait(2000);
        cy.server();
        cy.route('PUT', '/api/v1/file').as('updateFile');
        cy.get(`#Update_${hashFile} input[type=file]`).attachFile(name);
        cy.get('.ant-message-notice-content').should('be.visible');

        cy.wait('@updateFile').then((xhr) => {
          expect(xhr.responseBody).to.not.have.property('stack');
          cy.get('.ant-message-custom-content').as('File updated successfully')
            .should('be.visible')
            .should('contain.text', 'File updated successfully');
        });
        break;
      case 'folder':
        cy.contains(name).dblclick()
        cy.wait('@getFolder').then((xhr) => {
          expect(xhr.responseBody).to.not.have.property('stack')
          cy.server()
          cy.route('POST', '/api/v1/file').as('uploadFile')
          cy.contains('File Upload').click().wait(1000)
          cy.server()
          cy.route('POST', '/api/v1/file').as('uploadFile')

          cy.get(`input[type=file]`).attachFile(user);
          cy.get('.ant-message-notice-content').should('be.visible')

          cy.wait('@uploadFile').then((xhr) => {
            expect(xhr.status).to.equal(200)
            cy.log(xhr.responseBody.folder.files)
            cy.wait(1000)
            Cypress.env('filesInRoot', xhr.responseBody.folder.files)
            cy.get('.ant-message-custom-content').as('spin').should('be.visible')
          });
        })
        break;
    }
    //TODO: delete reload
    // cy.reload()
  });
});
