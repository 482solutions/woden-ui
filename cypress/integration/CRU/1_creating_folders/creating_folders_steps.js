import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

let login;
let email;
let password;

before("Generate user's data", function () {
    login = generator.generate({
        length: 15,
    });
    email = `${login.toLowerCase()}@gmail.com`;
    password = `${login}12345`;
    cy.visit('/')
    cy.get('.ant-col-offset-2 > a').as('Register now btn').click();
    cy.get('#name').type(login);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirm').type(password);
    cy.server()
    cy.route('POST', '/api/v1/user').as('getCert')
    cy.get('.ant-btn').as('SignUpNow').click()
    cy.get('.ant-message-custom-content').as('message valid registration')
        .should('be.visible')
        .should('contain.text', 'Registration was successful');

    cy.get('a[download]')
        .then((anchor) => (
            new Cypress.Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', anchor.prop('href'), true);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const blob = xhr.response;
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve(reader.result);
                            cy.writeFile('cypress/fixtures/privateKey.pem', reader.result)
                        };
                        reader.readAsText(blob);
                    }
                };
                xhr.send();
            })
        ))
    cy.wait('@getCert').then((xhr) => {
        cy.writeFile('cypress/fixtures/cert.pem', xhr.responseBody.cert)
    })

});

Then(/^Login as new user$/, function () {
    cy.visit('/')
    cy.get('#name').type(login); //OJOxKhIuAqeWpmX
    cy.get('#password').type(password); //OJOxKhIuAqeWpmX12345
    cy.get('input[type=file]').attachFile('cert.pem')
    cy.wait(1000)
    cy.get('input[type=file]').attachFile('privateKey.pem');
    cy.get('.ant-btn').as('Log in btn').click().wait(2000)
});

Given(/^The user is located in his root folder$/, function () {

});

When(/^The user press Create a new folder button$/, function () {
    cy.contains('New Folder').click().wait(2000)
});

When(/^The field name (.*) is filled by user from list of folder name$/, function (folderName) {
    cy.get('#newFolder').type(folderName)
});

Then(/^The folder is created with name (.*)$/, function (folderName) {
    cy.contains(folderName).should('be.visible')
});

When(/^The field name is empty$/, function () {
    cy.get('#newFolder').should('be.empty')
});

Then(/^The folder is NOT created$/, function () {

});

Then(/^error message is shown "([^"]*)"$/, function (textMessage) {
    cy.get('.ant-form-item-explain > div').should('contain.text', textMessage)
});

When(/^error message about invalid folder name is shown "([^"]*)"$/, function (messageInvalidFolderName) {
    cy.get('.ant-message-custom-content > :nth-child(2)')
        .should('be.visible')
        .should('contain.text', messageInvalidFolderName)
});

Then(/^The folder with invalid name (.*) is NOT created$/, function (invalidFolderName) {
    cy.contains(invalidFolderName).should('not.be.visible')
});

When(/^The name field is filled by the user with data from the list (.*)$/, function (invalidName) {
    cy.get('.ant-modal-body').should('be.visible')
    cy.get('#newFolder').type(invalidName)
});

Then(/^Close folder creation window$/, function () {
    cy.contains('Cancel').click()
});

When(/^The field name contain only spaces$/, function () {
    cy.get('#newFolder').type('           ')
});
When(/^Press Create folder$/, function () {
    cy.get('.ant-col-offset-5 > .ant-btn').as('Create btn').click().wait(2000)
});
Given(/^The user is created folder in root folder with name (.*) from list$/, function (name) {
    cy.contains(name).should('be.visible')
});

Given(/^Open this folder with name (.*)$/, function (createdFolder) {
    cy.contains(createdFolder).click()
});
