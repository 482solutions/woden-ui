import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before("Register new user", function () {
    cy.registerUser();
});

Given(/^Login as new user$/, function () {
    cy.loginAsNewUser()
});

When(/^The user double click this folder (.*) from list$/, function (createdFolder) {
    cy.contains(createdFolder).dblclick().wait(1000)
});
Given(/^User go back to root folder$/, function () {
    cy.reload()
});
