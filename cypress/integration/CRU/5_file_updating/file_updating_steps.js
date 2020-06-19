import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../../support/commands";

Given(/^Update file "([^"]*)"$/, (fileName) => {
    const textBefore = 'Good night!'
    const textAfter = 'Good morning!'

    cy.readFile(`cypress/fixtures/${fileName}`).then((str1) => {
        expect(str1).to.equal(textBefore)

        cy.writeFile(`cypress/fixtures/${fileName}`, textAfter).as('Write text to the file')
        cy.readFile(`cypress/fixtures/${fileName}`).then((str2) => {
            expect(str2).to.equal(textAfter)
        })
    });
});

Then(/^The last version remains in the system$/, () => {
    cy.wait('@getVersions').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        Cypress.env('versions', xhr.responseBody.versions)
        cy.wait(2000)
        cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
    })
});

Then(/^The sidebar "([^"]*)" is visible$/,  (element) => {
    cy.get(`#${element}`).should("be.visible")
});

When(/^Choose the needed "([^"]*)" for update to file with "([^"]*)" name$/, (uploadedFile, newFile) => {
    const hashFile = getHashFromFile(uploadedFile, Cypress.env('filesInRoot'))
    cy.server()
    cy.route('PUT', '/api/v1/file').as('updateFile')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(newFile);
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/test.pem`, 'Good night!')
})
