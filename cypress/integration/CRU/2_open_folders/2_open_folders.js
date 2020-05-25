import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

When(/^The user double click this folder (.*) from list$/, function (createdFolder) {
    cy.contains(createdFolder).dblclick().wait(1000)
});
Given(/^User go back to root folder$/, function () {
    cy.reload()
});
