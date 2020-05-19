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

When(/^Register new user$/, function () {
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

    cy.get('a[download]')
        .then((anchor) => (
            new Cypress.Promise((resolve) => {
                //XHR to get the blob that corresponds to the object URL.
                const xhr = new XMLHttpRequest();
                xhr.open('GET', anchor.prop('href'), true);
                xhr.responseType = 'blob';
                //fileReader to get the string back from the blob.
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                            privateKey = cy.writeFile('cypress/fixtures/privateKey.pem', reader.result)
                        };
                        reader.readAsText(blob);
                    }
                };
                xhr.send();
            })
        ))
    cy.readFile('cypress/fixtures/privateKey.pem').then((text) => {
        expect(text).to.include('-----BEGIN PRIVATE KEY-----')
        expect(text).to.include('-----END PRIVATE KEY-----');
    })

    cy.wait('@getCert').then((xhr) => {
        const response = xhr.responseBody
        cert = cy.writeFile('cypress/fixtures/cert.pem', response.cert)
    })

    cy.readFile('cypress/fixtures/cert.pem').then((text) => {
        expect(text).to.include('-----BEGIN CERTIFICATE-----')
        expect(text).to.include('-----END CERTIFICATE-----');
    })
});

Then(/^Login as new user$/, function () {
    cy.get('#name').type(login);
    cy.get('#password').type(password);
    cy.get('input[type=file]').attachFile('cert.pem')
    cy.wait(1000)
    cy.get('input[type=file]').attachFile('privateKey.pem');
    cy.get('.ant-btn').as('Log in btn').click()
    cy.wait(1000)
});

When(/^The user press "([^"]*)" button for exit$/, function (logoutBtn) {
    cy.contains(logoutBtn).click()
});

Then(/^The user is transferred to 'Sign in' page$/, function () {
    cy.url().should('include', '/login');
});