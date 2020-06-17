import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^Create folder with name "([^"]*)" in Folder_level_1$/, (folder2) => {
    cy.createFolderInFolder(folder2, 'Folder_level_1')
    cy.reload().wait(2000)
});

Given(/^The user opened folder "([^"]*)" from the root folder$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(2000)
});

When(/^The user press the back button$/,() => {
    cy.get('.goBack').click().wait(3000)
});

Then(/^The User is transferred to the root folder$/, () => {
    cy.inRootFolder()
});
Then(/^The Home and Back button becomes inactive$/, () => {
    cy.get('.goBack').should('be.disabled')
});
Given(/^The user opened folder "([^"]*)" in Folder_level_1$/, (createdFol) => {
    cy.contains(createdFol).dblclick().wait(3000)
});
Then(/^The User is transferred to the previous folder 1 level back$/, () => {
    cy.wait(3000)
    cy.get('.currentFolder').should('contain.text', 'Folder_level_1')
});