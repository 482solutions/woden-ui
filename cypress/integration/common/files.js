import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../support/commands";

Given(/^Choose the needed "([^"]*)" file from its PC directory for update$/, (f) => {
    const files = Cypress.env('filesInRoot')
    const hashFile = getHashFromFile(f, files)
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(f).wait(1000);
});

Then(/^The file "([^"]*)" is uploaded$/,  (file) => {
    cy.contains(file).should('be.visible').wait(1000)
});

Given(/^The user upload "([^"]*)" without UI$/, (fullFileName) => {
    cy.uploadFile(fullFileName)
    cy.reload()
});

When(/^The user press the Actions button in "([^"]*)" file$/, (fileName) => {
    const files = Cypress.env('filesInRoot')
    const hashFile = getHashFromFile(fileName, files)
    cy.get(`#Actions_${hashFile}`).click().wait(1000)
});

When(/^The user press the Update button in "([^"]*)" file$/,  (fileName2) => {
    const files = Cypress.env('filesInRoot')
    const hashFile = getHashFromFile(fileName2, files)
    cy.get(`#Update_${hashFile}`).click().wait(1000)
});

When(/^Choose the needed "([^"]*)" file from its PC directory$/,  (file)  =>{
    cy.get(`input[type=file]`).attachFile(file).wait(1000);
});