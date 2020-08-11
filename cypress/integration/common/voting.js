import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getDateTime} from "../../support/commands";

const variants = {
  0: [],
  1: ['Yes'],
  2: ['Yes', 'No'],
  3: ['Yes', 'No', 'Possibly'],
  4: ['Yes', 'No', 'Possibly', 'Not sure'],
  5: ['Yes', 'No', 'Possibly', 'Not sure', 'Return to one of previous versions'],
  6: ['Yes', 'No', 'Possibly', 'Not sure', 'Return to one of previous versions', 'I don\'t know'],
  7: ['Yes', 'No', 'Possibly', 'Not sure', 'Return to one of previous versions', 'I don\'t know', 'Hmmm...']
}

const desc = {
  5: 'ccccc',
  256: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  257: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  300: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
}

When(/^The screen for entering voting parameters is opened$/,  () => {
  cy.get('.ant-modal-body').should('be.visible')
});

When(/^Tab "([^"]*)" is opened and title "([^"]*)" is visible$/, (tabName, description) => {
  let arr = tabName.split('.')
  cy.get('.ant-steps-item-title')
    .should('contain.text', arr[1])
    .parent('.ant-steps-item-content')
    .parent('.ant-steps-item-container')
    .children('.ant-steps-item-icon')
    .children('.ant-steps-icon').contains(arr[0])
  cy.get('.modal-title').contains(description).should('be.visible')
});

When(/^Name of the document "([^"]*)" is visible in pop\-up$/, (fileName) => {
  cy.get('.modal-filename-title').contains(fileName).should('be.visible')
});

When(/^User adding (.*) of choices$/,  (count) => {
  let index;
  for (index = 0; index < variants[count].length; ++index) {
    cy.get('.ant-input-wrapper > .ant-input')
      .type(variants[count][index]);
    cy.get('.ant-input-group-addon > .ant-btn')
      .click().wait(1000);
    cy.get('.ant-row.ant-row-middle.variants')
      .should('have.length', index+1);
  }
});

When(/^User selects date and time$/,  () => {
  const fullDate = getDateTime('future')
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)
    .wait(3000);

  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click()
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm').click();
});

When(/^Description field (.*) characters$/,  (description) => {
  if (description !== 0) {
    cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').type(desc[description]);
  }
});

When(/^(\d+) users participate in the voting "([^"]*)"$/,  (count, user) => {
 switch (user) {
   case 'User2, User3':
     user = [Cypress.env('login_2'), Cypress.env('login_3')];
     break;
   case 'User2':
     user = Cypress.env('login_2');
     break;
   case 'User3':
     user = Cypress.env('login_3');
     break;
 }
  cy.get('.ant-row.sharedUser').should('have.length', count);
  if (count > 1){
    for (let index = 0; index < user.length; ++index) {
      cy.get('.ant-row.sharedUser').should('contain.text', user[index])
    }
  } else {
    cy.get('.ant-row.sharedUser').should('contain.text', user)
  }
});

Given(/^Button Start Voting is disabled$/, () => {
  cy.get('.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child').contains('Start Voting')
  cy.get('[aria-disabled=true]').children().contains('Start Voting')
});

Then(/^Pop\-up "([^"]*)" with description "([^"]*)" is visible$/,  (name, description) => {
  cy.get('.voting-success-title').contains(name).should('be.visible')
  cy.get('.voting-success-message').contains(description).should('be.visible')
});

Given(/^Button NEXT STEP is disabled$/, () => {
  cy.get('.ant-btn-primary').should('be.disabled')
});

Then(/^Button Add variant is disabled$/, () => {
  cy.get('.ant-input-group-addon > .ant-btn').should('be.disabled').as('Field')
  cy.get('.ant-input').should('be.disabled').as('Button Add Variant')
});

Given(/^User click CONTINUE button$/, () => {
  cy.get('.ant-btn.ant-btn-primary').contains('CONTINUE').click()
});

Given(/^In field "([^"]*)" can contain only (\d+) characters$/, (desc, count) => {
  cy.get('textarea').invoke('val')
    .then(text => expect(text.length).to.eq(256));
});

When(/^User selects date and time, which is real time$/, () => {
  const fullDate = getDateTime('now');
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)

    .wait(3000);
  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click()
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm').click();
});

Then(/^User selects date and time, which less than the real time$/, () => {
  const fullDate = getDateTime('past');
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)

    .wait(3000);
  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click()
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm').click();
});
When(/^Delete (\d+) variant "([^"]*)"$/, (count, variant) => {
  cy.get('.variants')
    .children('.text-users-name')
    .contains(variant)
    .parent()
    .children('.revokeAccess')
    .click()
});
Then(/^Count of variants (.*)$/, (count) => {
  cy.get('.variants').should('have.length', count)
});
Given(/^Owner delete "([^"]*)" from voting$/, (user) => {
  switch (user) {
    case 'User2':
      user = Cypress.env('login_2');
      break;
    case 'User3':
      user = Cypress.env('login_3');
      break;
  }
  cy.get('.sharedUser')
    .children('.sharedUserName')
    .contains(user)
    .parent()
    .parent()
    .children('.revokeAccess')
    .click()
});
When(/^The user open Voting tab$/, () => {
  cy.wait(2000)
  cy.server()
  cy.route('GET', '/api/v1/voting').as('getVote')
  cy.get('.sideBarMode.voting').click()
  cy.wait('@getVote').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});
Then(/^The list of available voting is displayed$/, () => {
  cy.wait(2000)
  cy.get('.votingContainer').should('be.visible')

});
Then(/^Voting for a file "([^"]*)" is visible$/, (file) => {
    cy.get('.ant-table-cell.table-text').contains(file).parent().should('be.visible')
});
Then(/^Voting for a file "([^"]*)" is not visible$/, (file) => {
  cy.get('.ant-table-cell.table-text').contains(file).should('not.exist');
});
