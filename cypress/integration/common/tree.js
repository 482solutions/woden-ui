import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

Given(/^The user open folders tree$/,  () => {
  cy.server()
  cy.route('GET', '/api/v1/tree').as('getTree')
  cy.get('.folderTree').click()
  cy.wait('@getFile').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Given(/^The tree is contain "([^"]*)"$/,  (folders) => {
  cy.get('ant-tree-list').should('contain.text', folders)
});
