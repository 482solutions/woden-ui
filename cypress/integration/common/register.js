import {Given} from "cypress-cucumber-preprocessor/steps";
import {getLogin, getPassword} from "../../support/commands";
import {getCSR} from "../../../src/utils/functions";

Given("Register without UI", () => {
  Cypress.env('login', `USER1${getLogin()}`)
  Cypress.env('password', getPassword(8, true))
  Cypress.env('email', `USER1${getLogin()}@gmail.com`)

  let csr = getCSR({username: Cypress.env('login')})
  cy.writeFile('cypress/fixtures/privateKey.pem', csr.privateKeyPem)
    .readFile('cypress/fixtures/privateKey.pem')
    .then((text) => {
      expect(text).to.include('-----BEGIN PRIVATE KEY-----')
      expect(text).to.include('-----END PRIVATE KEY-----')
    })
  cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendURL')}/user`,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'login': Cypress.env('login'),
        'email': Cypress.env('email'),
        'password': Cypress.env('password'),
        'privateKey': key,
        'CSR': csr.csrPem
      },
    }).then((resp) => {
      if (expect(201).to.eq(resp.status)) {
        Cypress.env('respStatus', resp.status)
        cy.writeFile('cypress/fixtures/cert.pem', resp.body.cert).then(() => {
          cy.readFile('cypress/fixtures/cert.pem').then((text) => {
            expect(text).to.include('-----BEGIN CERTIFICATE-----')
            expect(text).to.include('-----END CERTIFICATE-----')
          })
        })
      }
    })
  }).as('Register new user')
});

Given(/^Register without UI user2$/, () => {
  Cypress.env('login_2', `USER2${getLogin()}`)
  Cypress.env('password_2', getPassword(8, true))
  Cypress.env('email_2', `USER2${getLogin()}@gmail.com`)

  let csr = getCSR({username: Cypress.env('login_2')})
  cy.writeFile('cypress/fixtures/privateKey_2.pem', csr.privateKeyPem)
    .readFile('cypress/fixtures/privateKey_2.pem')
    .then((text) => {
      expect(text).to.include('-----BEGIN PRIVATE KEY-----')
      expect(text).to.include('-----END PRIVATE KEY-----')
    })
  cy.readFile('cypress/fixtures/privateKey_2.pem').then((key) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendURL')}/user`,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'login': Cypress.env('login_2'),
        'email': Cypress.env('email_2'),
        'password': Cypress.env('password_2'),
        'privateKey': key,
        'CSR': csr.csrPem
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

Given(/^Register without UI user3$/, () => {
  Cypress.env('login_3', `USER3${getLogin()}`)
  Cypress.env('password_3', getPassword(8, true))
  Cypress.env('email_3', `USER3${getLogin()}@gmail.com`)

  let csr = getCSR({username: Cypress.env('login_3')})
  cy.writeFile('cypress/fixtures/privateKey_3.pem', csr.privateKeyPem)
    .readFile('cypress/fixtures/privateKey_3.pem')
    .then((text) => {
      expect(text).to.include('-----BEGIN PRIVATE KEY-----')
      expect(text).to.include('-----END PRIVATE KEY-----')
    })
  cy.readFile('cypress/fixtures/privateKey_3.pem').then((key) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendURL')}/user`,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        'login': Cypress.env('login_3'),
        'email': Cypress.env('email_3'),
        'password': Cypress.env('password_3'),
        'privateKey': key,
        'CSR': csr.csrPem
      },
    }).then((resp) => {
      if (expect(201).to.eq(resp.status)) {
        Cypress.env('respStatus', resp.status)
        cy.writeFile('cypress/fixtures/cert_3.pem', resp.body.cert).then(() => {
          cy.readFile('cypress/fixtures/cert_3.pem').then((text) => {
            expect(text).to.include('-----BEGIN CERTIFICATE-----')
            expect(text).to.include('-----END CERTIFICATE-----')
          })
        })
      }
    })
  }).as('Register user3')
});
