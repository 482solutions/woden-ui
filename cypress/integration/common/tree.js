import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

Given(/^The user open folders tree$/,  () => {
  //TODO delete  cy.wait(3000)
  cy.wait(3000)
  cy.server()
  cy.route('GET', '/api/v1/tree').as('getTree')
  cy.get('.switcherIconRight').click()
  cy.get('.ant-message-notice-content')
    .should('be.visible')
    .and('contain.text', 'Getting folders tree..')
  cy.wait('@getTree').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Given(/^The tree is contain "([^"]*)"$/,  (folders) => {
  cy.get('.ant-tree-list').should('contain.text', folders)
});

When(/^User presses on "([^"]*)" folder in the tree$/, (folderTitle) => {
  cy.get('.ant-tree-title').contains(folderTitle).dblclick()
  cy.get('.ant-message-notice-content')
    .should('be.visible')
    .and('contain.text', 'Getting data...')
  cy.wait('@getFolder').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});
Given(/^The user presses on arrow near "([^"]*)"$/, (folderTitle) => {

});
