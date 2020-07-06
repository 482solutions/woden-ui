import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

When(/^Create folder testFolder without UI$/, () => {
    cy.createFolder('testFolder')
    cy.reload()
});

When(/^Upload files test1.txt, test.pem to these folders without UI$/, () => {
    // cy.uploadFile()
    // cy.reload()
    cy.contains('File Upload').click().wait(1000)
    cy.get('input[type=file]')
        .attachFile('test1.txt').wait(3000);
    cy.loginAsNewUser()
    cy.contains('File Upload').click().wait(1000)
    cy.get('input[type=file]').attachFile('test.pem').wait(1000);
});


Given(/^Any page of the application is open$/, () => {

});

When(/^The user types the name "([^"]*)" of a file or folder$/, (test1) => {
    cy.loginAsNewUser()
    cy.get('.ant-input').as('Search string')
        .should('be.visible').type(test1)
});
When(/^The user presses the search button$/, () => {
    cy.contains('Search').should('be.visible').click().wait(1000)
});

Given(/^Upload file to folder with name testFolder$/, () => {
    cy.contains('testFolder').dblclick().wait(3000)
    cy.contains('File Upload').click().wait(1000)
    cy.get('input[type=file]').attachFile('txtFile.txt').wait(1000);
});

Then(/^Search result is file "([^"]*)"$/, (resultSearch) => {
    cy.contains(resultSearch).should('be.visible')
});

Then(/^Search results are files "([^"]*)" and "([^"]*)"$/, (resultSearch1, resultSearch2) => {
    cy.contains(resultSearch1).should('be.visible')
    cy.contains(resultSearch2).should('be.visible')
});

Then(/^search result is folder with name "([^"]*)"$/, (resultSearchFolder) => {
    cy.contains(resultSearchFolder).should('be.visible')
});

When(/^Search field is empty$/, () => {
    cy.get('.ant-input').should('be.empty')
});

Then(/^Button Search not active$/, () => {
    // TODO
});

Then(/^Error message "([^"]*)" is visible$/, () => {
    cy.get('.ant-message-notice-content')
        .should('be.visible')
        .should('contain.text', 'Files or folders does not exist')
});
