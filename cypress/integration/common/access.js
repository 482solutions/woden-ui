import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile} from "../../support/commands";

Then(/^The user press the Shared with me button $/,  () => {
  cy.server()
  cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
  cy.get('.shared').should('be.visible').click()
});

Then(/^User 2 became Editor of "([^"]*)" file$/,  (file) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr.responseBody)
    expect(1).to.equal(xhr.responseBody.folder.sharedFiles)
    cy.contains(file).should('be.visible')
  })
});

When(/^Enter User 3 email$/,  () => {
  cy.get('#form_in_modal_username').should('be.visible')
    .type(Cypress.env('email_3'))
});

When(/^Login as new user 3 without UI$/,  () => {
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
    }).as('Login as user 2')

    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
      .visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', Cypress.env('token_3'))
          win.localStorage.setItem('rootFolder', Cypress.env('rootFolder_3'))
        },
      }).as('Set user3 token')
  })
});
Then(/^User 3 became Editor of "([^"]*)" file$/, (fileName) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')

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
