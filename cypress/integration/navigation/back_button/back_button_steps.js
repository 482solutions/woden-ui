import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^The user opened folder "([^"]*)" from the root folder$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(2000)
});

When(/^The user press the back button$/, () => {
    cy.wait(3000)
    cy.get('.goBack').click().wait(3000)
});

Then(/^The User is transferred to the root folder$/, () => {
    cy.inRootFolder()
});

Then(/^The Back button becomes inactive$/, () => {
    cy.get('.goBack_inactive').should('be.visible')
});

Given(/^The user opened folder "([^"]*)" in Folder_level_1$/, (createdFol) => {
    cy.contains(createdFol).dblclick()
});

Then(/^The User is transferred to the previous folder 1 level back$/, () => {
    cy.wait(3000)
    cy.get('.currentFolder').should('contain.text', 'Folder_level_1')
});
