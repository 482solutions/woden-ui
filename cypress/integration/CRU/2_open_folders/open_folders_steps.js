import {Given, When} from 'cypress-cucumber-preprocessor/steps';
import {createFolderInRoot, getLogin, getPassword} from "../../../support/commands";
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

When(/^The user double click this folder (.*) from list$/, (createdFolder) => {
  cy.contains(createdFolder).dblclick().wait(1000)
});


Given(/^Create folder with name from list (.*) in root without UI$/, (folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    createFolderInRoot(folder)
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
    cy.reload()
  })
});
