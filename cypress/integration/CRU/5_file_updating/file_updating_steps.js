import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^Choose the needed "([^"]*)" file from its PC directory$/, (file) => {
    cy.get('input[type=file]').attachFile(file).wait(1000);
});

Then(/^The "([^"]*)" file is uploaded$/, (fileUpl) => {
    cy.contains(fileUpl).should('be.visible').wait(1000)
});