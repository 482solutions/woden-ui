import {When} from "cypress-cucumber-preprocessor/steps";

When(/^Spin is visible "([^"]*)"$/, (text) => {
    cy.get('.ant-message-notice-content')
        .should('be.visible')
        .should('contain.text', text)
    // cy.wait(3000)
});