import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

Given(/^Create folder with name "([^"]*)" in root without UI$/,  (folder) => {
    cy.createFolderInRoot(folder)
    cy.reload().wait(2000)
});

Then(/^Folder "([^"]*)" should be visible on dashboard$/, (folderName) => {
    cy.reload().wait(2000)
    cy.get('.folderTitle').should('contain.text', folderName)
        .as(`Folder ${folderName} on the dashboard`).wait(1000)
});

Given(/^Create folder with name (.*) in root without UI$/,  (Name) => {
    cy.createFolderInRoot(Name)
    cy.reload().wait(2000)
});