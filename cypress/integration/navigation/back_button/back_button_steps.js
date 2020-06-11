import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^Create folder with name "([^"]*)" in root without UI$/,  (folder) => {
    cy.createFolderInRoot(folder)
    cy.reload().wait(2000)
});

Given(/^Create folder with name "([^"]*)" in Folder_level_1$/, (folder2) => {
    cy.createFolderInFolder(folder2, 'Folder_level_1')
    cy.reload().wait(2000)
});

Given(/^The user opened folder "([^"]*)" from the root folder$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(1000)
});

When(/^The user press the back button$/, function () {
    cy.get('.goBack').click().wait(2000)
});

Then(/^The User is transferred to the root folder$/, function () {
    cy.inRootFolder()
});
Then(/^The Home and Back button becomes inactive$/, function () {
    cy.get('.goBack').should('not.be.visible')
});
Given(/^The user opened folder "([^"]*)" in Folder_level_1$/, function (createdFol) {
    cy.contains(createdFol).dblclick().wait(2000)
});
Then(/^The User is transferred to the previous folder 1 level back$/, function () {
    cy.get('.currentFolder').should('contain.text', 'Folder_level_1')
});