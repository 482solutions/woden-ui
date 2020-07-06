import {Given, Then, When} from "cypress-cucumber-preprocessor/steps";
import {getHashFromFile, getHashFromFolder} from "../../support/commands";

Then(/^"([^"]*)" option from pop-up window is not visible$/,  () => {
  cy.get('#form_in_modal_permissions').should('not.be.visible')
});

Then(/^The user open Shared with me$/,  () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    cy.server()
    cy.route('GET', '/api/v1/folder/*').as('getFolder')
    cy.get('.shared').should('be.visible').click()
  })
});

Then(/^Button "([^"]*)" "([^"]*)"$/,  (btn, visible) => {
  cy.contains(btn).should(visible)
});

Then(/^User 2 became Owner of "([^"]*)" file$/, (file) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    console.log(xhr.responseBody)
    expect(1).to.equal(xhr.responseBody.folder.files.length)
    cy.contains(file).should('be.visible')
  })
});

Given(/^The user 1 is the owner of the folder "([^"]*)"$/, () => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    Cypress.env('foldersInRoot', xhr.responseBody.folder.folders)
    expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
  })
});

When(/^The user press the Actions button in "([^"]*)" folder$/, (folder) => {
  cy.wait(1000)
  const hashFolder = getHashFromFolder(folder, Cypress.env('foldersInRoot'))
  cy.get(`#Actions_${hashFolder}`).click().wait(1000)
});

When(/^The user press the Share button in "([^"]*)" folder$/, (folder) => {
  cy.wait(1000)
  const hashFolder = getHashFromFolder(folder, Cypress.env('foldersInRoot'))
  cy.get(`#Share_${hashFolder}`).click().wait(1000)
});

Then(/^User 2 became Owner of "([^"]*)" folder$/, (folder) => {
  cy.wait('@getFolder').then((xhr) => {
    expect(xhr.responseBody).to.not.have.property('stack')
    expect(1).to.equal(xhr.responseBody.folder.folders.length)
    cy.contains(folder).should('be.visible')
  })
});

When(/^The user press the Access list button in "([^"]*)" folder$/, (folder) => {
  cy.wait(1000)
  const hashFolder = getHashFromFolder(folder, Cypress.env('foldersInRoot'))
  cy.get(`#Permissions_${hashFolder}`).click().wait(1000)
});

When(/^The user press the Access list button in "([^"]*)" file$/, (file) => {
  cy.wait(1000)
  const hashFolder = getHashFromFile(file, Cypress.env('filesInRoot'))
  cy.get(`#Permissions_${hashFolder}`).click().wait(1000)
});


When(/^The "([^"]*)" sends a request to grant "([^"]*)" access to the "([^"]*)" "([^"]*)" to "([^"]*)"$/,
  (fromUser, permission, object, name, toUser) => {
    const headers = {
      'content-type': 'application/json'
    }

    switch (fromUser) {
      case 'User1':
        headers.Authorization = `Bearer ${Cypress.env('token')}`;
        break;
      case 'User2':
        headers.Authorization = `Bearer ${Cypress.env('token_2')}`;
        break;
      case 'User3':
        headers.Authorization = `Bearer ${Cypress.env('token_3')}`;
        break;
    } switch (toUser) {
      case 'User1':
        toUser = Cypress.env('email');
        break;
      case 'User2':
        toUser = Cypress.env('email_2');
        break;
      case 'User3':
        toUser = Cypress.env('email_3');
        break;
    } switch (permission) {
      case 'edit':
        permission = 'write';
        break;
      case 'view':
        permission = 'read';
        break;
    } switch (object) {
      case 'file':
        object = getHashFromFile(name, Cypress.env('filesInRoot'));
        break;
      case 'folder':
        object = getHashFromFolder(name, Cypress.env('foldersInRoot'));
        break;
    }
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('backendURL')}/permissions`,
      headers: headers,
      body: {
        'email': toUser,
        'hash': object,
        'permission': permission
      },
      failOnStatusCode: false
    }).then((resp) => {
      Cypress.env('respStatus', resp.status)
      Cypress.env('respBody', resp.body)
    })
  });
