import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getHashFromFile} from "../../../support/commands";

before(() => {
    cy.registerUser()
})

When(/^Upload new version of file "([^"]*)"$/, (oldFileName) => {
    cy.uploadFile(oldFileName, 'Good morning!')
    cy.reload()
});

Then(/^The popup versions is opened$/,  () => {
    cy.get('.VersionsModal').should('be.visible')
});
