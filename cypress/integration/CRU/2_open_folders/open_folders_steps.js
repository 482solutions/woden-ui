import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

When(/^The user double click this folder (.*) from list$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(1000)
});

Given(/^User go back to root folder$/, () => {
    cy.reload()
});

Then(/^Folder (.*) is opened$/, (folder) => {
    cy.get('.currentFolder').should('contain.text', folder)
});