import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getCSR} from "../../../../src/utils/functions";
import {getHashFromFile, getLogin, getPassword} from "../../../support/commands";


Given(/^The user 1 is the owner of the file$/, () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

Then(/^User 2 became Owner of "([^"]*)" file$/, (file) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr.responseBody)
    expect(1).to.equal(xhr.responseBody.folder.files.length)
    cy.contains(file).should('be.visible')
  })
});

Then(/^User 1 has Editors rights to "([^"]*)" file$/, (fileName) => {
  cy.loginAsNewUser()
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')

    cy.get('.shared').click()

    const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))
    cy.get(`#Actions_${hashFile}`).click().wait(1000)
    cy.get(`#Update_${hashFile}`).click().wait(1000)
    cy.server()
    cy.route('PUT', '/api/v1/file').as('updateFile')
    cy.get(`#Update_${hashFile} input[type=file]`).attachFile(fileName);
    cy.get('.ant-message-notice-content').should('be.visible')

    cy.wait('@updateFile').then((xhr) => {
      expect(xhr.responseBody).to.not.have.property('stack')
      cy.get('.ant-message-custom-content').as('File updated successfully')
        .should('be.visible')
        .should("contain.text", 'File updated successfully')
    })
  })
});
Given(/^Enter "([^"]*)"$/, (invalidEmail) => {
  cy.get('#form_in_modal_username').should('be.visible').type(invalidEmail)
});

Then(/^Error message "([^"]*)"$/, (message) => {
  cy.wait('@ownership').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(message)
      .should('be.visible')
      .should("contain.text", message)
  })
});
When(/^Enter email user 1$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('email'))
});

Then(/^Warning message "([^"]*)"$/, (message) => {
  cy.wait('@ownership').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.get('.ant-message-custom-content').as(message)
      .should('be.visible')
      .should("contain.text", message)
  })
});
Given(/^Register without UI user3$/, () => {
  Cypress.env('login_3', getLogin())
  Cypress.env('password_3', getPassword(8, true))
  Cypress.env('email_3', getLogin() + '@gmail.com')

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
        cy.writeFile('cypress/fixtures/cert_3.pem.pem', resp.body.cert).then(() => {
          cy.readFile('cypress/fixtures/cert_3.pem.pem').then((text) => {
            expect(text).to.include('-----BEGIN CERTIFICATE-----')
            expect(text).to.include('-----END CERTIFICATE-----')
          })
        })
      }
    })
  }).as('Register user3')
});

When(/^Enter email user2 and user3 in field "([^"]*)"$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(`${Cypress.env('email_2')}, ${Cypress.env('email_3')}`)
});

Then(/^Notification below the field "([^"]*)"$/, (text) => {
  cy.get('.ant-form-item-explain').should('contain.text', text)
});

When(/^Field email is empty$/, () => {
  cy.get('#form_in_modal_username').should('be.empty')
});

When(/^Enter spaces in field email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type('       ')
});
When(/^Enter username of user2 in field email$/, () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('login_2'))
});
