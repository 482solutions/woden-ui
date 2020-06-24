import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getHashFromFolder} from "../../../support/commands";

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

