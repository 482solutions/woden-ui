import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getLogin, getPassword} from "../../../support/commands";
import {getCSR} from "../../../../src/utils/functions";

before(() => {
  Cypress.env('login', `USER1${getLogin()}`)
  Cypress.env('password', getPassword(8, true))
  Cypress.env('email', `USER1${getLogin()}@gmail.com`)

  let csr = getCSR({username: Cypress.env('login')})
  cy.writeFile('cypress/fixtures/privateKey.pem', csr.privateKeyPem)
  cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendURL')}/user`,
      headers: {'content-type': 'application/json'},
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
        })
      }
    })
  }).as('Register new user')
})

When(/^The user types the name "([^"]*)" of a file or folder$/, (test1) => {
  cy.get('.ant-input').as('Search string')
    .should('be.visible').type(test1)
});

When(/^The user presses the search button$/, () => {
  cy.server()
  cy.route('GET', '/api/v1/search/*').as('search')
  cy.get('.ant-input-suffix').should('be.visible').click()
  cy.wait('@search').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Then(/^Search result is "([^"]*)"$/, (resultSearch) => {
  cy.contains(resultSearch).should('be.visible')
});

When(/^Search field is empty$/, () => {
  cy.get('.ant-input').should('be.empty')
});

Then(/^Button Search not active$/, () => {
  cy.get('.ant-input-group-addon').should('not.be.disabled')
});

Then(/^Error message "([^"]*)" is visible$/, () => {
  // cy.get('.ant-message-notice-content')
  //   .should('be.visible')
  //   .should('contain.text', 'Files or folders does not exist')
});

Then(/^Error message "([^"]*)" is not visible$/, () => {
  cy.get('.ant-message-custom-content').should('not.be.visible')
});

When(/^The user types "([^"]*)" in search field$/, (text) => {
  cy.get('.ant-input').as('Search string')
    .should('be.visible').type(text)
});
