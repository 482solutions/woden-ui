import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

before(() => {
    cy.registerUser()
})

When(/^Login as new user without UI$/, () => {
    cy.loginAsNewUser()
});
Given(/^Upload file "([^"]*)"$/, function () {

});
Then(/^The user updating file$/, function () {
    cy.get().download()
});
Then(/^Upload new version of file$/, function () {

});
Then(/^Latest version of file is shown on user's dashboard$/, function () {

});
Given(/^The user sees the list of available versions$/, function () {

});
When(/^The user press on any version$/, function () {

});
Then(/^The User downloads chosen version$/, function () {

});
