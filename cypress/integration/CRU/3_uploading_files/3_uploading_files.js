import { Then } from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

Then(/^The user gets error notification "([^"]*)"$/, (errMessage) => {
    cy.get('.ant-message-custom-content')
        .should('be.visible')
        .should('contain.text', errMessage)
});

Then(/^The file is not uploaded$/, () =>  {
    //TODO
});

Then(/^Message "([^"]*)"$/, (messUploadFile) => {
    cy.get('.ant-message-custom-content').as(messUploadFile)
        .should('be.visible')
        .should("contain.text", messUploadFile)
});
