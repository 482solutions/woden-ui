import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getCSR} from "../../../../src/utils/functions";
import {getLogin, getPassword} from "../../../support/commands";

const URL = 'http://localhost:1823/api/v1'
const headers = {'content-type': 'application/json'}

Given(/^Register without UI user2$/,  () => {
    Cypress.env('login_2', getLogin())
    Cypress.env('password_2', getPassword(8, true))
    Cypress.env('email_2', getLogin() + '@gmail.com')

    let csr2 = getCSR({username: Cypress.env('login_2')})
    cy.writeFile('cypress/fixtures/privateKey_2.pem', csr2.privateKeyPem)
        .readFile('cypress/fixtures/privateKey_2.pem')
        .then((text) => {
            expect(text).to.include('-----BEGIN PRIVATE KEY-----')
            expect(text).to.include('-----END PRIVATE KEY-----')
        })
    cy.readFile('cypress/fixtures/privateKey.pem').then((key2) => {
        cy.request({
            method: 'POST',
            url: `${URL}/user`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'login': Cypress.env('login_2'),
                'email': Cypress.env('email_2'),
                'password': Cypress.env('password_2'),
                'privateKey': key2,
                'CSR': csr2.csrPem
            },
        }).then((resp) => {
            if (expect(201).to.eq(resp.status)) {
                Cypress.env('respStatus', resp.status)
                cy.writeFile('cypress/fixtures/cert_2.pem', resp.body.cert).then(() => {
                    cy.readFile('cypress/fixtures/cert_2.pem').then((text) => {
                        expect(text).to.include('-----BEGIN CERTIFICATE-----')
                        expect(text).to.include('-----END CERTIFICATE-----')
                    })
                })
            }
        })
    }).as('Register user2')
});

Given(/^The user 1 is the owner of the file$/,  () => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
    })
});

Given(/^Enter User 2 email$/,  () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type(Cypress.env('email_2'))
});

Given(/^Choose the "([^"]*)" option from pop\-up window$/,  (option) => {
    cy.get('.ant-modal-header').should('be.visible')
    cy.get('#form_in_modal_permissions').should('be.visible').click().wait(1000)
    cy.contains(option).click(1000)
});

Given(/^Press "([^"]*)"$/,  (confirm) => {
    cy.server()
    cy.route('PUT', '/api/v1/permissions').as('ownership')
    cy.contains(confirm).click()
    cy.wait('@ownership').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        console.log(xhr.responseBody)
        // expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
    })
});

Then(/^Login as new user 2 without UI$/,  () => {
    cy.readFile('cypress/fixtures/cert_2.pem').then((certificate) => {
        cy.readFile('cypress/fixtures/privateKey_2.pem').then((key) => {
            cy.request({
                method: 'POST',
                url: `${URL}/user/auth`,
                headers: headers,
                body: {
                    'login': Cypress.env('login_2'),
                    'password': Cypress.env('password_2'),
                    'certificate': certificate,
                    'privateKey': key,
                },
            }).then((resp) => {
                if (expect(200).to.eq(resp.status)) {
                    Cypress.env('token_2', resp.body.token)
                    Cypress.env('respStatus', resp.status)
                    Cypress.env('rootFolder_2', resp.body.folder)
                }
            })
        }).as('Login')

        cy.server()
        cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
            .visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', Cypress.env('token_2'))
                    win.localStorage.setItem('rootFolder', Cypress.env('rootFolder_2'))
                },
            }).as('Set user2 token')
    })
});
