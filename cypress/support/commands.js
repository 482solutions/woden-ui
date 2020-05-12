require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('typeLogin', (login) => {
  cy.get('#name').type(login);
})
