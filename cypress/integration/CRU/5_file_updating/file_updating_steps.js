import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import { getHashFromFile } from "../../../support/commands";

before(() => {
    cy.registerUser()
})

Given(/^Update file "([^"]*)"$/, (filename) => {
    cy.updateTxtFile(filename)
});

Then(/^The new version of the file "([^"]*)" is updated$/, (fileName) => {
    const files = Cypress.env('filesInRoot')
    const hashFile = getHashFromFile(fileName, files)
    cy.get(`#Versions_${hashFile}`).click().wait(1000)
});

after(() => {
    cy.writeFile(`cypress/fixtures/test.pem`, 'Good night!')
})