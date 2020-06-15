import {Given, Then} from "cypress-cucumber-preprocessor/steps";

Given(/^Choose the needed "([^"]*)" file from its PC directory$/, (file) => {
    cy.get('input[type=file]').attachFile(file).wait(1000);
});

Then(/^The file "([^"]*)" is uploaded$/,  (file) => {
    cy.contains(file).should('be.visible').wait(1000)
});