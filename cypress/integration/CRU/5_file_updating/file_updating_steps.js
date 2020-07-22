import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import {getHash} from "../../../support/commands";

Given(/^Update file "([^"]*)"$/, (fileName) => {
    const textBefore = 'Good night!'
    const textAfter = 'Good morning!'
    cy.wait('@uploadFile').then((xhr) => {
        cy.readFile(`cypress/fixtures/${fileName}`).then((str1) => {
            expect(str1).to.equal(textBefore)

            cy.writeFile(`cypress/fixtures/${fileName}`, textAfter).as('Write text to the file')
            cy.readFile(`cypress/fixtures/${fileName}`).then((str2) => {
                expect(str2).to.equal(textAfter)
            })
        });
    })
});

Then(/^The last version remains in the system$/, () => {
    cy.wait('@getVersions').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        const version = Cypress.env('versions', xhr.responseBody.versions)
        cy.get(`#Time_${version[1].cid}`).should("be.visible")
    })
});

Then(/^The sidebar "([^"]*)" is visible$/,  (element) => {
    cy.get(`#${element}`).should("be.visible")
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/test.pem`, 'Good night!')
})
