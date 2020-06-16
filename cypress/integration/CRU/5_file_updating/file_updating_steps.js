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

Then(/^The new version of the file "([^"]*)" is updated$/, (fileName) => {
    const files = Cypress.env('filesInRoot')
    cy.wait('@getVersions').then((xhr) => {
        Cypress.env('versions', xhr.response.body.file.versions)
        const hashFile = getHashFromFile(fileName, files)
        cy.get(`#Versions_${hashFile}`).click().wait(6000)
    })
});

Then(/^The last version remains in the system$/, () => {
    cy.get('#VersionWrapper').should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
});

When(/^Choose the needed "([^"]*)" for update to file with "([^"]*)" name$/, (uploadedFile, newFile) => {
    const hashFile = getHashFromFile(uploadedFile, Cypress.env('filesInRoot'))
    cy.server()
    cy.route('PUT', '/api/v1/file').as('getVersions')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(newFile).wait(3000);
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/test.pem`, 'Good night!')
})