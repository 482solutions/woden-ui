import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../support/commands";

Given(/^Choose the needed "([^"]*)" file from its PC directory for update$/, (f) => {
    const hashFile = getHashFromFile(f, Cypress.env('filesInRoot'))
    cy.server()
    cy.route('PUT', '/api/v1/file').as('updateFile')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(f);
});

Then(/^The file "([^"]*)" is uploaded$/, (file) => {
    cy.contains(file).should('be.visible').wait(1000)
});

Given(/^The user upload "([^"]*)" without UI$/, (fullFileName) => {
    cy.uploadFile(fullFileName)
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
    cy.reload()
});

When(/^The user press the Actions button in "([^"]*)" file$/, (fileName) => {
    cy.wait(3000)
    const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))
    cy.get(`#Actions_${hashFile}`).click().wait(1000)
});

When(/^The user press the Update button in "([^"]*)" file$/, (fileName2) => {
    const hashFile = getHashFromFile(fileName2, Cypress.env('filesInRoot'))
    cy.get(`#Update_${hashFile}`).click().wait(1000)
});

When(/^Choose the needed "([^"]*)" file from its PC directory$/, (file) => {
    cy.get(`input[type=file]`).attachFile(file);
});
Then(/^Message about update file "([^"]*)"$/, (messUploadFile) => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
    })
    cy.wait('@updateFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-custom-content').as(messUploadFile)
            .should('be.visible')
            .should("contain.text", messUploadFile)
    })
});

Then(/^The user updating file "([^"]*)"$/, (fileName) => {
    cy.updateTxtFile(fileName).wait(2000)
});

Then(/^The user press the Versions button in "([^"]*)" file$/, (fileName) => {
    cy.server()
    cy.route('GET', '/api/v1/versions/*').as('getVersions')
    const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))
    cy.get(`#Versions_${hashFile}`).click()

    cy.wait('@getVersions').then((xhr) => {
        Cypress.env('versions', xhr.responseBody.versions)
        expect(xhr.responseBody).to.not.have.property('stack')
    })
});

Then(/^Button Download is visible$/, () => {
    cy.get(`#Download_${Cypress.env('versions')[0].cid}`).should("be.visible")
    cy.get(`#Download_${Cypress.env('versions')[1].cid}`).should("be.visible")
});