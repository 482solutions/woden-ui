import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Then(/^The Home button becomes inactive$/,  () => {
    cy.get('.goHome_inactive').should('be.visible')
});
