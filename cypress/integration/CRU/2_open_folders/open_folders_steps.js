import {Given, When} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

When(/^The user double click this folder (.*) from list$/, (createdFolder) => {
    cy.contains(createdFolder).dblclick().wait(1000)
});


Given(/^Create folder with name from list (.*) in root without UI$/,  (folder) => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.createFolderInRoot(folder)
        cy.server()
        cy.route('GET', '/api/v1/folder/*').as('getFolder')
        cy.reload()
    })
});
