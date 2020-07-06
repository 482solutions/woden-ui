import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

let login;
let email;
let password;
let privateKey;
let cert;

before('Register new user', () => {
    login = generator.generate({});
    email = `${login.toLowerCase()}@gmail.com`;
    password = `${login}12345`;
});

When(/^Register new user$/, () => {
    cy.visit('/');
    cy.get('.ant-col-offset-2 > a').click();
    cy.get('#name').type(login);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type(password);
    cy.server()
    cy.route('POST', '/api/v1/user').as('getCert')
    cy.get('.ant-btn').as('SignUpNow').click()
    cy.get('.ant-message-custom-content').as('message valid registration')
        .should('be.visible')
        .should('contain.text', 'Registration was successful');
});

Then(/^Login as new user$/, () => {
    cy.get('#name').type(login);
    cy.get('#password').type(password);
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