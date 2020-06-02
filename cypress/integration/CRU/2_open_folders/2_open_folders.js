import {Given, When} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

When(/^The user double click this folder (.*) from list$/,  (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(1000)
});

Given(/^User go back to root folder$/,  () => {
    cy.get('.goHome').click()
});
Given(/^Create folder with name (.*) from list without UI$/,  (folderName) => {
    cy.createFolder(folderName, 'root')
});