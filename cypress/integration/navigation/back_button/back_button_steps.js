import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';


Then(/^The Back button becomes inactive$/, () => {
    cy.get('.goBack_inactive').should('be.visible')
});
