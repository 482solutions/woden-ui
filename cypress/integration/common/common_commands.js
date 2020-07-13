import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getCSR} from "../../../src/utils/functions";
import {getLogin, getPassword} from "../../support/commands";


Given(/^The application is opened$/, () => {
  cy.visit('/');
});

When(/^there is no open session$/, () => {
  const cookie = cy.getCookies().should('have.length', 0);
  if (cookie.length !== 0) {
    cy.clearCookies();
  }
});

When(/^The user press Register now button$/, () => {
  cy.get('.ant-col-offset-2 > a').click();
});

Then(/^Sign Up form is open$/, () => {
  cy.get('.ant-form').should('be.visible');
});

When(/^the user press Log in button$/, () => {
  cy.get('.ant-btn.loginFormItem.LoginButtonItem.loginButton.ant-btn-primary').click()
});

Then(/^User is signed in$/, () => {
  cy.wait(2000)
  cy.contains('Logout').should('be.visible')
});

Then(/^User is not signed in$/, () => {
  cy.url().should('include', '/login');
});

Given(/^The user does not fill in the fields$/, () => {
  cy.get('#name').should('be.empty');
  cy.get('#password').should('be.empty');
});

Then(/^Error notification User not found is shown$/, () => {
  cy.contains('User not found').should('be.visible')
});

Then(/^Error notification is shown Invalid password supplied$/, () => {
  cy.wait(2000)
  cy.contains('Invalid password supplied').should('be.visible')
});

Then(/^Error message Username can not be empty$/, () => {
  cy.contains('Username can not be empty').should('be.visible')
});

Then(/^Error message Password can not be empty$/, () => {
  cy.contains('Password can not be empty').should('be.visible')
});

When(/^The user press Create a new folder button$/, () => {
  cy.get('.ant-btn.newFolder-button').click().wait(2000)
});

When(/^The field name is empty$/, () => {
  cy.get('#newFolder').should('be.empty')
});

When(/^The field name (.*) is filled by user from list of folder name$/, (folderName) => {
  cy.get('#newFolder').type(folderName).wait(1000)
});

Then(/^The folder is created with name (.*)$/, (folderName) => {

  cy.wait('@createFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
  })
  cy.server()
  cy.route('GET', '/api/v1/folder/*').as('getFolder')
  //TODO delete cy.reload()
  cy.reload()
  cy.wait('@getFolder').then((xhr) => {
    cy.contains(folderName).should('be.visible').wait(2000)
  })

});

When(/^Press Create folder$/, () => {
  cy.server()
  cy.route('POST', '/api/v1/folder').as('createFolder')
  cy.get('.ant-col-offset-5 > .ant-btn').as('Create btn').click()
});

When(/^The user press Upload a new file button$/, () => {
  cy.contains('File Upload').click().wait(2000)
});

Given(/^The user is authorized$/, () => {
  expect(Cypress.env('rootFolder')).to.equal(localStorage.rootFolder)
});

Then(/^The file is uploaded$/, (file) => {
  cy.contains(file).should('be.visible').wait(1000)
});

When(/^Folder is opened (.*)$/, (userCreatedFolder) => {
  cy.get('.currentFolder').should('contain.text', userCreatedFolder)
});

Given(/^The user located on root dashboard$/, () => {
  expect(Cypress.env('rootFolder')).to.equal(localStorage.rootFolder)
});

Given(/^RELOAD$/, () => {
  cy.wait(1000)
  cy.reload()
});

When(/^The user press the back button$/, () => {
  cy.get('.goBack').click()
});
