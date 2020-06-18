import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^The user sees the list of versions$/, () => {
    cy.wait(2000)
    cy.get('#VersionWrapper').should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
});

When(/^The user press Download button on (\d+) version$/, (version) => {
    cy.wait(2000)
    cy.server()
    cy.route('GET', '/api/v1/file/*/*').as('getFile')
    console.log(Cypress.env('versions'))
    cy.get(`#Download_${Cypress.env('versions')[version].cid}`).click()
});

Then(/^Version (\d+) should contain text "([^"]*)"$/, (version, text) => {
    cy.wait('@getFile').then((xhr) => {
        console.log(xhr.status)
        console.log(xhr.responseBody)
        expect(text).to.eq(xhr.responseBody.file)
    })
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/TestUpload.txt`, 'Good night!')
})
