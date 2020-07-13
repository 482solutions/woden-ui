import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';


When(/^The user press the back button$/, () => {
    cy.get('.goBack').click()
});

Then(/^The Back button becomes inactive$/, () => {
    cy.get('.goBack_inactive').should('be.visible')
});
