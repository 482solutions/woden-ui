// import {Then} from "cypress-cucumber-preprocessor/steps";
//
// let cert;
//
// Then(/^The User got certificate in pem format$/, () => {
//   cy.wait('@getCert').then(function (xhr) {
//     const response = xhr.responseBody
//     cert = cy.writeFile('cypress/fixtures/cert.pem', response.cert)
//   })
//   cy.readFile('cypress/fixtures/cert.pem').then((text) => {
//     expect(text).to.include('-----BEGIN CERTIFICATE-----')
//     expect(text).to.include('-----END CERTIFICATE-----');
//   })
// });

