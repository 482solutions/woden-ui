import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";

Given(/^The user open folders tree$/,  () => {
  cy.wait(500)
  cy.server()
  cy.route('GET', '/api/v1/tree').as('getTree')
  cy.get('.switcherIconRight').click()
  // cy.get('.ant-message-notice-content')
  //   .should('be.visible')
  //   .and('contain.text', 'Getting folders tree..')
  cy.wait('@getTree').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Given(/^The tree is contain "([^"]*)"$/,  (folders) => {
  let f = folders.replace(/[\s,]/g, '');
  cy.get('.ant-tree-list').should('contain.text', f)
});

When(/^User presses on "([^"]*)" folder in the tree$/, (folderTitle) => {
  cy.wait(400)
  cy.get('.ant-tree-title').contains(folderTitle).click()
  // cy.get('.ant-message-notice-content')
  //   .should('be.visible')
  //   .and('contain.text', 'Getting data...')
  cy.wait('@getFolder').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Given(/^The user presses on arrow near "([^"]*)"$/, (folderTitle) => {
  cy.get('.ant-tree-list-holder-inner')
    .children('.ant-tree-treenode.ant-tree-treenode-switcher-close')
    .contains(folderTitle)
    .parent()
    .parent()
    .children('.ant-tree-switcher.ant-tree-switcher_close').click()
});
