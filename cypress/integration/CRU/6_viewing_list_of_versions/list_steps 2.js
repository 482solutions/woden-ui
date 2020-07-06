import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Given(/^The user send "([^"]*)" without UI$/, (fullFileName) => {
    cy.uploadTxtFile(fullFileName, 'Hello, world!')
    cy.reload()
});

When(/^Upload new version of file "([^"]*)"$/, (oldFileName) => {
    cy.uploadTxtFile(oldFileName, 'Good morning!')
    cy.reload()
});

When(/^The user press the Actions button in "([^"]*)" file$/, (fileName) => {
    let hashFile = cy.getHashFromFile(fileName)
    cy.get(`.Actions_${hashFile}`).click().wait(1000)
});

When(/^The user press the Versions button in "([^"]*)" file$/, function () {
    let hashFile = cy.getHashFromFile(fileName2)
    cy.get(`.Versions_${hashFile}`).click().wait(1000)
});

Then(/^The popup versions is opened$/, function () {
    cy.get('.VersionsModal').should('be.visible')
});

