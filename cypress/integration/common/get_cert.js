import {Then} from "cypress-cucumber-preprocessor/steps";

Then(/^The User got certificate in pem format$/, () => {
  cy.wait('@getCert').then( (xhr) => {
    cy.writeFile('cypress/fixtures/cert.pem', xhr.responseBody.cert)
  })
  cy.readFile('cypress/fixtures/cert.pem').then((text) => {
    expect(text).to.include('-----BEGIN CERTIFICATE-----')
    expect(text).to.include('-----END CERTIFICATE-----');
  })
  cy.wait(2000)
});

