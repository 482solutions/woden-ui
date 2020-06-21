import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^The user located on root dashboard$/, () => {
    cy.userAuth()
});

When(/^The user double click the file "([^"]*)"$/, (filename) => {
    cy.wait(2000)
    cy.server()
    cy.route('GET', '/api/v1/file/*/*').as('getFile')
    cy.contains(filename).dblclick()
});

Then(/^The file is downloaded$/, () => {
    cy.wait('@getFile').then((xhr) => {
        console.log(xhr.status)
        console.log(xhr.responseBody)
        expect('1234567890').to.eq(xhr.responseBody.file)
    })
});