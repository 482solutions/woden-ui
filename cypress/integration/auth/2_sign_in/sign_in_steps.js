import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

let login;
let email;
let password;

before('Register new user and login', () => {
    login = generator.generate({});
    email = `${login.toLowerCase()}@gmail.com`;
    password = `${login}12345`;
    cy.visit('/');
    cy.get('.ant-col-offset-2 > a').click();
    cy.get('#name').type(login);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type(password);
    cy.server()
    cy.route('POST', '/api/v1/user').as('getCert')
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
        ))
    cy.wait('@getCert').then((xhr) => {
        cy.writeFile('cypress/fixtures/cert.pem', xhr.responseBody.cert)
    })
});

Given(/^User has filled in the field valid username$/, () => {
    cy.get('#name').type(login);
});

Given(/^filled valid password field$/, () => {
    cy.get('#password').type(password);
});

Given(/^Pin cert$/, () => {
    cy.get('input[type=file]').attachFile('cert.pem').wait(1000)
});

Given(/^Pin privateKey$/, () => {
    cy.get('input[type=file]').attachFile('privateKey.pem');
});

Given(/^User has filled in the field valid email$/, () => {
    cy.get('#name').type(email);
});

Given(/^User has filled invalid username (.*) in the field username from list$/, (invUsername) => {
    cy.get('#name').type(invUsername);
});

Given(/^filled invalid password (.*) in the field password from list$/, (invPassword) => {
    cy.get('#password').type(invPassword);
});
