import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Then(/^The folder is NOT created$/,  () => {

});

Then(/^error message is shown "([^"]*)"$/,  (textMessage) => {
    cy.get('.ant-form-item-explain > div').should('contain.text', textMessage)
});

When(/^error message about invalid folder name is shown "([^"]*)"$/, (messageInvalidFolderName) => {
    cy.get('.ant-message-custom-content > :nth-child(2)')
        .should('be.visible')
        .should('contain.text', messageInvalidFolderName)
});

Then(/^The folder with invalid name (.*) is NOT created$/, (invalidFolderName) => {
    cy.contains(invalidFolderName).should('not.be.visible')
});

When(/^The name field is filled by the user with data from the list (.*)$/, (invalidName) => {
    cy.get('.ant-modal-body').should('be.visible')
    cy.get('#newFolder').type(invalidName)
});

Then(/^Close folder creation window$/,  () => {
    cy.contains('Cancel').click()
});

When(/^The field name contain only spaces$/, () => {
    cy.get('#newFolder').type('           ')
});

Given(/^The user is created folder in root folder with name (.*) from list$/, (name) => {
    cy.contains(name).should('be.visible')
});

Given(/^Open this folder with name (.*)$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick()
});

