import {Then} from "cypress-cucumber-preprocessor/steps";

Then(/^Versions of "([^"]*)" are 2$/, () => {
    expect(Cypress.env('versions').length).to.eq(2)
});

Then(/^The user sees the list of available versions and the time, date when the version was created$/,  () => {
    cy.wait('@getVersions').then((xhr) => {
        cy.wait(400)
        Cypress.env('versions', xhr.responseBody.versions)
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('#VersionWrapper').should("be.visible")

        const firstVers = Cypress.env('versions')[0].cid
        const secondVers = Cypress.env('versions')[1].cid

        cy.get(`#Time_${firstVers}`).should("be.visible")
        cy.get(`#Time_${secondVers}`).should("be.visible")
    })
});