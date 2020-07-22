import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Given(/^The user sees the list of versions$/, () => {
  cy.wait('@getVersions').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    Cypress.env('versions', xhr.responseBody.versions)
    cy.get('#VersionWrapper').should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
    cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
  })
});

When(/^The user press Download button on (\d+) version$/, (version) => {
  cy.wait(3000)
  cy.server()
  cy.route('GET', '/api/v1/file/*/*').as('getFile')
  cy.get(`#Download_${Cypress.env('versions')[version].cid}`).click()
});

Then(/^Version (\d+) should contain text "([^"]*)"$/, (version, textFile) => {
  cy.wait('@getFile').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(200).to.equal(xhr.status)
    const blob = xhr.responseBody;
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      const text = e.srcElement.result;
      expect(text).to.equal(textFile)
    });
    reader.readAsText(blob);
  })
});

afterEach(() => {
  cy.writeFile(`cypress/fixtures/TestUpload.txt`, 'Good night!')
})
