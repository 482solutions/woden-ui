import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^The user sees the list of versions$/, () => {
    cy.wait('@getVersions').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        Cypress.env('versions', xhr.responseBody.versions)
        cy.get('#VersionWrapper').should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
    })
});

When(/^The user press Download button on (\d+) version$/, (version) => {
    cy.wait(3000)
    cy.server()
    cy.route('GET', '/api/v1/file/*/*').as('getFile')
    console.log(Cypress.env('versions'))
    cy.get(`#Download_${Cypress.env('versions')[version].cid}`).click()
});

Then(/^Version (\d+) should contain text "([^"]*)"$/, (version, text) => {
    cy.wait('@getFile').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        console.log(xhr.responseBody)
        expect(text).to.eq(xhr.responseBody)
    })
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/TestUpload.txt`, 'Good night!')
})
