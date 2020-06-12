import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^The user located on root dashboard$/, function () {
    cy.userAuth()
});

When(/^The user double click the file "([^"]*)"$/, function (filename) {
    cy.wait(2000)
    cy.server()
    cy.route('GET', '/api/v1/file/*').as('getFile')
    cy.contains(filename).dblclick()
});

Then(/^The file is downloaded$/, function () {
    cy.wait('@getFile')
        .then(function (xhr) {
            console.log(xhr.status)
            console.log(xhr.responseBody)
            expect('1234567890\n').to.eq(xhr.responseBody.file)
        })
});