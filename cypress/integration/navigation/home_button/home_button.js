import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

When(/^User click Home button$/, () => {
    cy.get('.goHome').click().wait(1000)
});

Then(/^The Home button becomes inactive$/,  () => {
    cy.get('.goHome_inactive').should('be.visible')
});
