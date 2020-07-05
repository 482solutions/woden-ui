import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../support/commands";

Then(/^The user updating file "([^"]*)"$/, (fileName) => {
    cy.wait('@uploadFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.updateTxtFile(fileName).as('UpdateTxtFile')
    })
});

When(/^Choose the needed "([^"]*)" for update to file with "([^"]*)" name$/, (uploadedFile, newFile) => {
    const hashFile = getHashFromFile(uploadedFile, Cypress.env('filesInRoot'))
    cy.server()
    cy.route('PUT', '/api/v1/file').as('updateFile')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(newFile);
});

When(/^User can update file "([^"]*)"$/,  (fileName) => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.updateTxtFile(fileName).as('UpdateTxtFile')
    })
});
