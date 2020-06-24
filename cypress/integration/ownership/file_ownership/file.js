import {Then} from 'cypress-cucumber-preprocessor/steps';

Then(/^User 2 became Owner of "([^"]*)" file$/, (file) => {
  cy.wait('@getRootFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr.responseBody)
    expect(1).to.equal(xhr.responseBody.folder.files.length)
    cy.contains(file).should('be.visible')
  })
});
