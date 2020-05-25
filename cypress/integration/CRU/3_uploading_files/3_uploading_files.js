import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

When(/^Choose the needed txt file from its PC directory$/, () => {
    cy.get('input[type=file]').attachFile('txtFile.txt').wait(1000);
});

Then(/^The txt file is uploaded$/, () => {
    cy.contains('txtFile.txt').should('be.visible').wait(1000)
});

When(/^Choose the needed test.txt file from PC directory$/, () =>  {
    cy.get('input[type=file]').attachFile('test.txt').wait(1000);
});

When(/^Choose the needed test.pem file from PC directory$/, () =>  {
    cy.get('input[type=file]').attachFile('test.pem').wait(1000);
});

Then(/^The txt and pem files are uploaded$/, () =>  {
    cy.contains('test.txt').should('be.visible').wait(1000)
    cy.contains('test.pem').should('be.visible').wait(1000)
});

When(/^Choose two files from PC directory with the same name$/, () =>  {
    cy.get('input[type=file]').attachFile('cantUpload.txt')
    cy.get('input[type=file]').attachFile('cantUpload.txt')
        .wait(1000);
});
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

When(/^Choose the needed PDF file from its PC directory$/, () =>  {
    cy.get('input[type=file]').attachFile('test.pdf').wait(1000);
});