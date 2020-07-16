import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

When(/^The user types the name "([^"]*)" of a file or folder$/, (test1) => {
  cy.get('.ant-input').as('Search string')
    .should('be.visible').type(test1)
});

When(/^The user presses the search button$/, () => {
  cy.get('.ant-input-suffix').should('be.visible').click().wait(1000)
});

Then(/^Search result is "([^"]*)"$/, (resultSearch) => {
  cy.contains(resultSearch).should('be.visible')
});

When(/^Search field is empty$/, () => {
  cy.get('.ant-input').should('be.empty')
});

Then(/^Button Search not active$/, () => {
  cy.get('.ant-input-group-addon').should('not.be.disabled')
});

Then(/^Error message "([^"]*)" is visible$/, () => {
  cy.get('.ant-message-notice-content')
    .should('be.visible')
    .should('contain.text', 'Files or folders does not exist')
});

Then(/^Error message "([^"]*)" is not visible$/, () => {
  cy.get('.ant-message-custom-content').should('not.be.visible')
});

When(/^The user types "([^"]*)" in search field$/, (text) => {
  cy.get('.ant-input').as('Search string')
    .should('be.visible').type(text)
});
