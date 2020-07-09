import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^The user double click this folder "([^"]*)"$/, (folder) => {
    cy.contains(folder).dblclick()
});

Then(/^The user is located in his created folder "([^"]*)"$/, (folderName) => {
    cy.get('.currentFolder')
        .should('be.visible')
        .should('contain.text', folderName)
});

When(/^User click Home button$/, () => {
    cy.get('.goHome').click().wait(1000)
});

Then(/^The Home button becomes inactive$/,  () => {
    cy.get('.goHome_inactive').should('be.visible')
});

Then(/^The user is located in root folder$/,  () => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.currentFolder').should('contain.text', 'My Drive')
    })
});
