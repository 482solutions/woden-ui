import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getDateTime, getHash, getVoting} from "../../support/commands";
// const sinon = require('sinon');
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
  5: 'some text',
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
    .children('.ant-steps-icon')
    .contains(arr[0])
  cy.get('.modal-title')
    .contains(description)
    .should('be.visible')
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
      .click({ force: true }).wait(100);
    cy.get('.ant-row.ant-row-middle.variants')
      .should('have.length', index+1);
  }
});

When(/^User selects date and time$/,  () => {
  const fullDate = getDateTime('future')
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)
    .wait(500);

  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click({ force: true })
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm')
    .click({ force: true });
});

When(/^Description field (.*) characters$/,  (description) => {
  if (description !== 0) {
    cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input')
      .type(desc[description]);
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
  cy.get('.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child')
    .contains('Start Voting')
  cy.get('[aria-disabled=true]')
    .children()
    .contains('Start Voting')
});

Then(/^Pop\-up "([^"]*)" with description "([^"]*)" is visible$/,  (name, description) => {
  cy.get('.voting-success-title')
    .contains(name)
    .should('be.visible')
  cy.get('.voting-success-message')
    .contains(description)
    .should('be.visible')
});

Given(/^Button NEXT STEP is disabled$/, () => {
  cy.get('.ant-btn-primary')
    .should('be.disabled')
});

Then(/^Button Add variant is disabled$/, () => {
  cy.get('.ant-input-group-addon > .ant-btn')
    .should('be.disabled').as('Field')
  cy.get('.ant-input')
    .should('be.disabled').as('Button Add Variant')
});

Given(/^User click CONTINUE button$/, () => {
  cy.get('.ant-btn.ant-btn-primary')
    .contains('CONTINUE')
    .click({ force: true })
});

Given(/^In field "([^"]*)" can contain only (\d+) characters$/, (desc, count) => {
  cy.get('textarea')
    .invoke('val')
    .then(text => expect(text.length).to.eq(256));
});

When(/^User selects date and time, which is real time$/, () => {
  const fullDate = getDateTime('now');
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)

    .wait(500);
  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click({ force: true })
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm')
    .click({ force: true });
});

Then(/^User selects date and time, which less than the real time$/, () => {
  const fullDate = getDateTime('past');
  cy.get(':nth-child(1) > .ant-row-center > .ant-picker > .ant-picker-input')
    .type(fullDate.dateString)

    .wait(500);
  cy.get(':nth-child(3) > .ant-row-center > .ant-picker > .ant-picker-input > input')
    .click({ force: true })
    .type(`${fullDate.hour}:${fullDate.minutes}`)
    .get('.ant-btn.ant-btn-primary.ant-btn-sm').click({ force: true });
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
  let logins = {
    User2: Cypress.env('login_2'),
    User3: Cypress.env('login_3'),
  }
  cy.get('.sharedUser')
    .children('.sharedUserName')
    .contains(logins[user])
    .parent()
    .parent()
    .children('.revokeAccess')
    .click()
});

When(/^The user open Voting tab$/, () => {
  cy.wait(400)
  cy.server()
  cy.route('GET', '/api/v1/voting').as('getVote')
  cy.get('.sideBarMode.voting')
    .click({ force: true })
  cy.wait('@getVote').then((xhr) => {
    expect(200).to.equal(xhr.status)
    expect(xhr.responseBody).to.not.have.property('stack')
  })
});

Then(/^The list of available voting is displayed$/, () => {
  cy.wait(400)
  cy.get('.votingContainer')
    .should('be.visible')
});

Then(/^Voting for a file "([^"]*)" "([^"]*)"$/, (file, state) => {
    cy.get('.ant-table-cell.table-text')
      .contains(file)
      .parent()
      .should(state)
});

Then(/^Voting for a file "([^"]*)" is not visible$/, (file) => {
  cy.get('.ant-table-cell.table-text')
    .contains(file)
    .should('not.exist');
});

Given(/^Total voters for a file "([^"]*)" "([^"]*)"$/, (file, votes) => {
  cy.get('.ant-table-cell.table-text')
    .contains(file)
    .parent()
    .parent()
    .children()
    .contains(votes)
});

Given(/^The "([^"]*)" sends a request to create vote for a file "([^"]*)" with (\d+) variants$/,
  (owner, file, answers, users) => {
    let logins = {
      User1: Cypress.env('token'),
      User2: Cypress.env('token_2'),
      User3: Cypress.env('token_3'),
    }
    const time = Math.floor(new Date().getTime() / 1000.0) + 60
    cy.request({
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${logins[owner]}`
      },
      method: 'POST',
      url: `${Cypress.env('backendURL')}/voting`,
      body: {
        hash: getHash(file, Cypress.env('filesInRoot')),
        dueDate: time.toString(),
        variants: variants[answers],
        excludedUsers: [],
        description: desc[5],
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.body).to.not.have.property('stack');
      Cypress.env('respBody', resp.body)
      Cypress.env('respStatus', resp.status)
      if (resp.status === 201) {
        expect(resp.body).to.not.have.property('message');

        let vote = getVoting(file, resp.body.response)
        Cypress.env('votingHash', vote.votingHash)
      }
    })
});

When(/^The user press "([^"]*)" button for voting$/,  (file) => {
  cy.get('.ant-table-cell.table-text')
    .contains(file)
    .parent()
    .parent()
    .children()
    .contains('Vote')
    .click()
});

When(/^Pop\-up "([^"]*)" "([^"]*)"$/,  (title, state) => {
  cy.get('.ant-modal-body')
    .contains(title)
    .should(state)
});

When(/^User chooses variant "([^"]*)"$/,  (variant) => {
  cy.get('.ant-row.button-row')
    .children('.voting-button')
    .contains(variant)
    .click({ force: true })
});

When(/^Status of voting is "([^"]*)" for a file "([^"]*)"$/,  (status, file) => {
  cy.get('.ant-table-cell.table-text')
    .contains(file)
    .parent()
    .parent()
    .children()
    .children('img').should('have.attr', 'src').should('include',`${status}Voting.svg`)

});

Then(/^The user can not vote for this file "([^"]*)"$/,  (file) => {
  cy.get('.ant-table-cell.table-text')
    .contains(file)
    .parent()
    .parent()
    .children()
    .contains('Vote')
    .should('be.disabled')
});

When(/^Set time after voting ends$/,  () => {
  // const now =  new Date().getTime()
  // const fakeTime = sinon.useFakeTimers(now)
  //
  // if (now !== fakeTime) {
  //   console.log('fakeTime: ', fakeTime)
  //
  //   fakeTime.tick(3600000) // 1 hour
  //   console.log(new Date())//=> return the fake Date
  //   // fakeTime.restore()
  //   // let dateRestore = new Date() //=> will return the real time again (now)
  //   // console.log('dateRestore: ', dateRestore)
  // }
  cy.wait(100000)
});

When(/^Button "([^"]*)" is disable$/,  (button) => {
  cy.contains(button).should('be.disabled')
});

When(/^Close pop\-up voting$/, () => {
  cy.get('.close-icon').click()
});

Given(/^"([^"]*)" send a request to vote for the "([^"]*)" variant for "([^"]*)" file$/,  (user, variant, file) => {
  let tokens = {
    User1: Cypress.env('token'),
    User2: Cypress.env('token_2'),
    User3: Cypress.env('token_3'),
  }
  cy.request({
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokens[user]}`
    },
    method: 'PUT',
    url: `${Cypress.env('backendURL')}/voting`,
    body: {
      hash: Cypress.env('votingHash'),
      variant: variant,
    },
    failOnStatusCode: false,
  }).then((resp) => {
    expect(resp.body).to.not.have.property('stack');
  })
});

When(/^Pop\-up Result is opened$/,  () => {
  cy.get('.ant-modal-body').should('be.visible')
});

When(/^Count of voters "([^"]*)" "([^"]*)" "([^"]*)"$/,  (totalVoted, slash, voters) => {
  cy.get('.voting-results')
    .contains('Voting results')
    .parent()
    .children('.voting-results-number')
    .should('contain.text', totalVoted)
    .should('contain.text', slash)
    .should('contain.text', voters)

});

When(/^The percentage of those "([^"]*)" who voted for the option "([^"]*)"$/,  (perc, option) => {
  cy.get('.result-option-variant')
    .contains(option)
    .parent()
    .children('.result-option-percentage')
    .contains(perc)
});

Then(/^Close pop\-up results of voting$/,  () => {
  cy.get('.close-icon > img').click({ force: true })
});

Given(/^The "([^"]*)" sends a request to create vote for a file "([^"]*)" with (\d+) variants without "([^"]*)"$/,
  (owner, file, answers, users) => {
  let tokens = {
    User1: Cypress.env('token'),
    User2: Cypress.env('token_2'),
    User3: Cypress.env('token_3'),
  }
  let logins = {
    User2: Cypress.env('login_2'),
    User3: Cypress.env('login_3'),
  }
  const time = Math.floor(new Date().getTime() / 1000.0) + 100
  cy.request({
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${tokens[owner]}`
    },
    method: 'POST',
    url: `${Cypress.env('backendURL')}/voting`,
    body: {
      hash: getHash(file, Cypress.env('filesInRoot')),
      dueDate: time.toString(),
      variants: variants[answers],
      excludedUsers: [logins[users]],
      description: desc[5],
    },
    failOnStatusCode: false,
  }).then((resp) => {
    expect(resp.body).to.not.have.property('stack');
    Cypress.env('respBody', resp.body)
    Cypress.env('respStatus', resp.status)
    if (resp.status === 201) {
      expect(resp.body).to.not.have.property('message');

      let vote = getVoting(file, resp.body.response)
      Cypress.env('votingHash', vote.votingHash)
    }
  })
});

Then(/^Voting for a file "([^"]*)" doesn't exist$/,  (file) => {
  cy.contains(file).should('not.be.visible')
});

When(/^Press "([^"]*)" button$/,  (button) => {
  cy.get('.ant-row-center > .ant-btn')
    .should('contain.text', button).click({ force: true })
});
