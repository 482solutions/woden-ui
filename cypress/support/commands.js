// require('cypress-downloadfile/lib/downloadFileCommand')
// "cypress-downloadfile": "^1.2.0", from package.json
import 'cypress-file-upload';

const generator = require('generate-password');

let login;
let email;
let password;

Cypress.Commands.add('registerUser', () => {
    login = generator.generate({
        length: 15,
    });
    email = `${login.toLowerCase()}@gmail.com`;
    password = `${login}12345`;
    cy.visit('/')
    cy.get('.ant-col-offset-2 > a').as('Register now btn').click();
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
})
Cypress.Commands.add('loginAsNewUser', () => {
    cy.visit('/')
    cy.get('#name').type('evVVzEFxCkMEOpu');login
    cy.get('#password').type('evVVzEFxCkMEOpu12345');password
    cy.get('input[type=file]').attachFile('cert.pem')
    cy.wait(1000)
    cy.get('input[type=file]').attachFile('privateKey.pem');
    cy.get('.ant-btn').as('Log in btn').click().wait(5000)
})