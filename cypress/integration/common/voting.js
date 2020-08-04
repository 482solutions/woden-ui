import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getFolderOwner, getHash} from "../../support/commands";
import {unixToString} from "../../../src/utils/functions";

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
  0: '',
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
  let dateString;
  const unixTime = Math.round( new Date().getTime() / 1000) + 200000;

  let year = new Date(unixTime * 1000).getFullYear();
  let month = new Date(unixTime * 1000).getMonth();
  let date = new Date(unixTime * 1000).getDate();
  let hour = new Date(unixTime * 1000).getHours();
  let minutes = new Date(unixTime * 1000).getMinutes();

  if (date < 10 || month < 10) {
    dateString = `${year}-0${month +1}-0${date}`;
    // console.log(dateString)
  } else {
    dateString = `${year}-${month +1}-${date}`;
    // console.log(dateString)
  }
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(dateString)
    .wait(2000);
  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click()
    .type(`${hour}:${minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm').click();
  // cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input').contains(`${hour}:${minutes}`)

});
When(/^Description field (.*) characters$/,  (description) => {
  cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').type(desc[description]);
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

Given(/^Button "([^"]*)" is disabled$/, (btn) => {
  cy.contains(btn).should('be.disabled')
});
