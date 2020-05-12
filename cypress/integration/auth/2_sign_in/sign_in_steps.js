import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const generator = require('generate-password');

let login;
let email;
let password;
let privateKey;
let cert;

// before('Register new user', () => {
//   login = generator.generate({});
//   email = `${login.toLowerCase()}@gmail.com`;
//   password = `${login}12345`;
//   cy.visit('/');
//   cy.get('.ant-col-offset-2 > a').click();
//   cy.get('#name').type("vladkostya");
//   cy.get('#email').type('vladkostya@g.com');
//   cy.get('#password').type('vlad&kostyA1');
//   cy.get('#confirm').type('vlad&kostyA1');
//   cy.server()
//   cy.route('POST', '/api/v1/user').as('getCert')
//   cy.get('.ant-btn').as('SignUpNow').click()
//   cy.get('.ant-message-custom-content').as('message valid registration')
//     .should('be.visible')
//     .should('contain.text', 'Registration was successful');
//
//   cy.get('a[download]')
//     .then((anchor) => (
//       new Cypress.Promise((resolve) => {
//         //XHR to get the blob that corresponds to the object URL.
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', anchor.prop('href'), true);
//         xhr.responseType = 'blob';
//         //fileReader to get the string back from the blob.
//         xhr.onload = () => {
//           if (xhr.status === 200) {
//             const blob = xhr.response;
//             const reader = new FileReader();
//             reader.onload = () => {
//               resolve(reader.result);
//               privateKey = cy.writeFile('cypress/fixtures/privateKey.pem', reader.result)
//             };
//             reader.readAsText(blob);
//           }
//         };
//         xhr.send();
//       })
//     ))
//   cy.readFile('cypress/fixtures/privateKey.pem').then((text) => {
//     expect(text).to.include('-----BEGIN PRIVATE KEY-----')
//     expect(text).to.include('-----END PRIVATE KEY-----');
//   })
//
//   cy.wait('@getCert').then(function (xhr) {
//     const response = xhr.responseBody
//     cert = cy.writeFile('cypress/fixtures/cert.pem', response.cert)
//   })
//
//   cy.readFile('cypress/fixtures/cert.pem').then((text) => {
//     expect(text).to.include('-----BEGIN CERTIFICATE-----')
//     expect(text).to.include('-----END CERTIFICATE-----');
//   })
// });

Given(/^User has filled in the field valid username$/, function () {
  cy.get('#name').type('vladkostya');
});

Given(/^filled valid password field$/, function () {
  cy.get('#password').type('vlad&kostyA1');
});

Given(/^Pin cert$/, function () {
  const cert = 'cert.pem';
  cy.get('input[type=file]')
    .attachFile(cert)
  cy.wait(1000)
});

Given(/^Pin privateKey$/, function () {
  const privateKey = 'privateKey.pem'
  cy.get('input[type=file]')
    .attachFile(privateKey);
});

When(/^the user press Log in button$/, function () {
  cy.get('.ant-btn').as('Log in btn').click()
});

Then(/^User is signed in$/, function () {
  cy.contains('Logout')
    .should('be.visible')
});

Given(/^User has filled in the field valid email$/, function () {
  cy.get('#name').type('vladkostya@g.com');
});

Given(/^User has filled invalid username (.*) in the field username from list$/, function (invalidUsername) {
  cy.get('#name').type(invalidUsername);
});
