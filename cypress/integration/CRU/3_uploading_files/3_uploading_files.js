import { Then } from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Then(/^The user gets error notification "([^"]*)"$/, (errMessage) => {
    cy.get('.ant-message-custom-content')
        .should('be.visible')
        .should('contain.text', errMessage)
});

Then(/^The file "([^"]*)" is not uploaded$/,  (file) => {
    cy.contains(file).should('be.visible').wait(1000)
});