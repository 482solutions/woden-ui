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

Then(/^The file "([^"]*)" is downloaded and contain text "([^"]*)"$/, (file, text) => {
    cy.wait('@getFile').then((xhr) => {
        expect(200).to.equal(xhr.status)
        expect('This file is ok!\n').to.equal(xhr.responseBody)
    })
});


