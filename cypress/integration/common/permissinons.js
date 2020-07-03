import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile, getHashFromFolder} from "../../support/commands";

When(/^Enter User 3 email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('email_3'))
});

Then(/^User has Editors rights to "([^"]*)" file$/, (fileName) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.reload()
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

Then(/^"([^"]*)" option from pop-up window is not visible$/,  () => {
  cy.get('#form_in_modal_permissions').should('not.be.visible')
});

Then(/^The user press the Shared with me button$/,  () => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
    cy.get('.shared').should('be.visible').click()
  })
});

Then(/^The user open Shared with me$/,  () => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
    cy.get('.shared').should('be.visible').click()
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

Given(/^The user 1 is the owner of the folder "([^"]*)"$/, () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    Cypress.env('foldersInRoot', xhr.responseBody.folder.folders)
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

When(/^The user press the Actions button in "([^"]*)" folder$/, (folder) => {
  cy.wait(1000)
  const hashFolder = getHashFromFolder(folder, Cypress.env('foldersInRoot'))
  cy.get(`#Actions_${hashFolder}`).click().wait(1000)
});

When(/^The user press the Share button in "([^"]*)" folder$/, (folder) => {
  cy.wait(1000)
  const hashFolder = getHashFromFolder(folder, Cypress.env('foldersInRoot'))
  cy.get(`#Share_${hashFolder}`).click().wait(1000)
});

Then(/^User 2 became Owner of "([^"]*)" folder$/, (folder) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(1).to.equal(xhr.responseBody.folder.folders.length)
    cy.contains(folder).should('be.visible')
  })
});

Then(/^User 1 has Editors rights to "([^"]*)" folder$/, () => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')

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
  })
});

