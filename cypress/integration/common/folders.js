import {Given, Then} from "cypress-cucumber-preprocessor/steps";

Given(/^Create folder with name "([^"]*)" in root without UI$/, (folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.createFolderInRoot(folder)
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
    cy.reload()
  })
});

Then(/^Folder "([^"]*)" should be visible on dashboard$/, (folderName) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.folderTitle').should('contain.text', folderName)
      .as(`Folder ${folderName} on the dashboard`).wait(1000)
  })
});

Then(/^User has Editors rights to "([^"]*)" folder$/, (folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.contains(folder).dblclick()

    cy.wait('@getFolder').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')
      cy.server()
      cy.route('POST', '/api/v1/file').as('uploadFile')
      cy.contains('File Upload').click().wait(1000)

      cy.get(`input[type=file]`).attachFile('TestUpload.txt')
      cy.get('.ant-message-custom-content').as('spin').should('be.visible')
      cy.wait('@uploadFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-notice-content').should('be.visible')
        //TODO: delete cy.reload()
        cy.reload()
        // cy.contains('TestUpload.txt').should('be.visible')
      })
    })
  })
});

Given(/^Create folder with name "([^"]*)" in "([^"]*)"$/, (folder2, folder1) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.createFolderInFolder(folder2, folder1)
    //TODO: delete cy.reload() and open folder
    cy.reload()
  })
});

Then(/^The user located in Shared with me$/,  () => {
  cy.get('.currentFolder').should('contain.text', 'Shared with me')
});
