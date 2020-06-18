import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

When(/^Register new user$/, () => {
    cy.visit('/');
    cy.get('.ant-col-offset-2 > a').click();
    cy.get('#name').type(Cypress.env('login'));
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#confirm').type(Cypress.env('password'));
    cy.server()
    cy.route('POST', '/api/v1/user').as('getCert')
    cy.get('.ant-btn').as('SignUpNow').click()
    cy.get('.ant-message-custom-content').as('message valid registration')
        .should('be.visible')
        .should('contain.text', 'Registration was successful');
});

Then(/^Login as new user$/, () => {
    cy.get('#name').type(Cypress.env('login'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('input[type=file]').attachFile('cert.pem')
    cy.wait(1000)
    cy.get('input[type=file]').attachFile('privateKey.pem');
    cy.get('.ant-btn').as('Log in btn').click()
    cy.wait(1000)
});

When(/^The user press "([^"]*)" button for exit$/, (logoutBtn) => {
    cy.contains(logoutBtn).click()
});

Then(/^The user is transferred to 'Sign in' page$/, () => {
    cy.url().should('include', '/login');
});