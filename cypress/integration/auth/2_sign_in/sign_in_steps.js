import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getLogin, getPassword} from "../../../support/commands";

before(() => {
    Cypress.env('login', getLogin())
    Cypress.env('email', getLogin() + '@gmail.com')
    Cypress.env('password', getPassword(8, false))

    cy.visit('/');
    cy.wait(3000)
    cy.get('.ant-col-offset-2 > a').click();
    cy.get('#name').type(Cypress.env('login'));
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#confirm').type(Cypress.env('password'));
    cy.server()
    cy.route('POST', `/api/v1/user`).as('getCert')
    cy.get('.ant-btn').as('Sign Up Now Btn').click()
    cy.get('a[download]')
        .then((anchor) => (
            new Cypress.Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', anchor.prop('href'), true);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                            cy.writeFile('cypress/fixtures/privateKey.pem', reader.result)
                        };
                        reader.readAsText(blob);
                    }
                };
                xhr.send();
            })
        )).wait('@getCert').then((xhr) => {
        cy.writeFile('cypress/fixtures/cert.pem', xhr.responseBody.cert)
    })
    cy.wait(5000)
});

Given(/^User has filled in the field valid username$/, () => {
    cy.wait(2000)
    cy.get('#name').type(Cypress.env('login'));
});

Given(/^filled valid password field$/, () => {
    cy.get('#password').type(Cypress.env('password'));
});

Given(/^Pin cert$/, () => {
    cy.get('input[type=file]').attachFile('cert.pem').wait(3000)
});

Given(/^Pin privateKey$/, () => {
    cy.get('input[type=file]').attachFile('privateKey.pem').wait(3000)
});

Given(/^User has filled in the field valid email$/, () => {
    cy.wait(2000)
    cy.get('#name').type(Cypress.env('email'));
});

Given(/^User has filled invalid username (.*) in the field username from list$/, (invUsername) => {
    cy.wait(2000)
    cy.get('#name').type(invUsername);
});

Given(/^filled invalid password (.*) in the field password from list$/, (invPassword) => {
    cy.get('#password').type(invPassword);
});
