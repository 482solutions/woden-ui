import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';


When(/^Create folder testFolder without UI$/, function () {
    // cy.createFolder('testFolder')
    cy.reload()
});

When(/^Upload files test1.txt, test2.txt to these folders without UI$/, function () {
    // cy.uploadFile()
    // cy.reload()
    // cy.contains('File Upload').click().wait(1000)
    // cy.get('input[type=file]').attachFile('test1.txt').wait(1000);
    // cy.contains('File Upload').click().wait(1000)
    // cy.get('input[type=file]').attachFile('test2.txt').wait(1000);
});

Then(/^Folder should be visible on dashboard$/, function () {

});
Given(/^Any page of the application is open$/, function () {

});
When(/^The user types the name "([^"]*)" of a file or folder$/, function (test1) {
    cy.loginAsNewUser()
    cy.get('.ant-input').as('Search string')
        .should('be.visible').type(test1)
});
When(/^The user presses the search button$/, function () {
    cy.contains('Search').should('be.visible').click().wait(1000)
});