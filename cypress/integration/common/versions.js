import {Then} from "cypress-cucumber-preprocessor/steps";

Then(/^Versions of "([^"]*)" are 2$/, () => {
    expect(Cypress.env('versions').length).to.eq(2)
});

Then(/^The user sees the list of available versions and the time, date when the version was created$/,  () => {
    cy.wait('@getVersions').then((xhr) => {
        Cypress.env('versions', xhr.responseBody.versions)
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('#VersionWrapper').should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
    })
});