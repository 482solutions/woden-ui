import {Given, Then} from "cypress-cucumber-preprocessor/steps";

Given(/^Create folder with name "([^"]*)" in root without UI$/,  (folder) => {
    cy.wait('@getRootFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.createFolderInRoot(folder)
        cy.server()
        cy.route('GET', '/api/v1/folder/*').as('getFolder')
        cy.reload()
    })
});

Then(/^Folder "([^"]*)" should be visible on dashboard$/, (folderName) => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.folderTitle').should('contain.text', folderName)
            .as(`Folder ${folderName} on the dashboard`).wait(1000)
    })
});
