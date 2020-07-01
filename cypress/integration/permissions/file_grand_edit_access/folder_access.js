import {Then} from "cypress-cucumber-preprocessor/steps";

Then(/^Folder "([^"]*)" is visible$/,  (folder) => {
  cy.contains(folder).should('be.visible')
});
Then(/^The user opens the shared folder "([^"]*)"$/, (folder) => {
  cy.contains(folder).dblclick()
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});
Then(/^The file "([^"]*)" is visible$/, (file) => {
  cy.contains(file).should('be.visible')
});
Then(/^The file "([^"]*)" is not visible$/, (file) => {
  cy.contains(file).should('not.be.visible')
});
