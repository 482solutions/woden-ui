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

Then(/^The folder is NOT created$/, () => {

});

Then(/^error message is shown "([^"]*)"$/, (textMessage) => {
  cy.get('.ant-form-item-explain > div').should('contain.text', textMessage)
});

When(/^error message about invalid folder name is shown "([^"]*)"$/, (messageInvalidFolderName) => {
  cy.get('.ant-message-custom-content > :nth-child(2)')
    .should('be.visible')
    .should('contain.text', messageInvalidFolderName)
});

Then(/^The folder with invalid name (.*) is NOT created$/, (invalidFolderName) => {
  cy.contains(invalidFolderName).should('not.be.visible')
});

When(/^The name field is filled by the user with data from the list (.*)$/, (invalidName) => {
  cy.get('.ant-modal-body').should('be.visible')
  cy.get('#newFolder').type(invalidName)
});

Then(/^Close folder creation window$/, () => {
  cy.contains('Cancel').click()
});

When(/^The field name contain only spaces$/, () => {
  cy.get('#newFolder').type('           ')
});

Given(/^The user is created folder in root folder with name (.*) from list$/, (name) => {
  cy.contains(name).should('be.visible')
});

Given(/^Open this folder with name (.*)$/, (createdFolder) => {
  cy.contains(createdFolder).dblclick()
});

