import {Then, When} from "cypress-cucumber-preprocessor/steps";

When(/^Login as new user without UI$/, (user) => {
  cy.wait(2000)
  cy.readFile('cypress/fixtures/cert.pem').then((certificate) => {
    cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendURL')}/user/auth`,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          'login': Cypress.env('login'),
          'password': Cypress.env('password'),
          'certificate': certificate,
          'privateKey': key,
        },
      }).then((resp) => {
        expect(resp.body).to.not.have.property('stack')
        if (expect(200).to.eq(resp.status)) {
          Cypress.env('token', resp.body.token)
          Cypress.env('respStatus', resp.status)
          Cypress.env('rootFolder', resp.body.folder)
        }
      })
    }).as('Login')
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
      .visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', Cypress.env('token'))
          win.localStorage.setItem('rootFolder', Cypress.env('rootFolder'))
        },
      }).as('Set user token')
  })
});

Then(/^Login as new user 2 without UI$/, () => {
  cy.wait(4000)
  cy.readFile('cypress/fixtures/cert_2.pem').then((certificate) => {
    cy.readFile('cypress/fixtures/privateKey_2.pem').then((key) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendURL')}/user/auth`,
        headers: {
          'content-type': 'application/json'
        },
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
    }).as('Login as user 2')

    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
      .visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', Cypress.env('token_2'))
          win.localStorage.setItem('rootFolder', Cypress.env('rootFolder_2'))
        },
      }).as('Set user2 token')
  })
});

When(/^Login as new user 3 without UI$/, () => {
  cy.wait(4000)
  cy.readFile('cypress/fixtures/cert_3.pem').then((certificate) => {
    cy.readFile('cypress/fixtures/privateKey_3.pem').then((key) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendURL')}/user/auth`,
        headers: {'content-type': 'application/json'},
        body: {
          'login': Cypress.env('login_3'),
          'password': Cypress.env('password_3'),
          'certificate': certificate,
          'privateKey': key,
        },
      }).then((resp) => {
        if (expect(200).to.eq(resp.status)) {
          Cypress.env('token_3', resp.body.token)
          Cypress.env('respStatus', resp.status)
          Cypress.env('rootFolder_3', resp.body.folder)
        }
      })
    }).as('Login as user 3')

    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
      .visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', Cypress.env('token_3'))
          win.localStorage.setItem('rootFolder', Cypress.env('rootFolder_3'))
        },
      }).as('Set user3 token')
  })
});
