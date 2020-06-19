import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

Then(/^Versions of "([^"]*)" are 2$/, () => {
    expect(Cypress.env('versions').length).to.eq(2)
});

Then(/^The user sees the list of available versions and the time, date when the version was created$/,  () => {
    cy.wait('@getVersions').then((xhr) => {
        Cypress.env('versions', xhr.responseBody.versions)
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('#VersionWrapper').should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[0].cid}`).should("be.visible")
        cy.get(`#Time_${Cypress.env('versions')[1].cid}`).should("be.visible")
    })
});

Then(/^Button Close versions is visible$/, () => {
    cy.get('#CloseVersionsWrapper').should("be.visible")
});

Then(/^User click Close list of versions button$/, () => {
    cy.get('#CloseVersionsWrapper').click().wait(1000)
});

Then(/^The list of versions is not visible in dashboard$/, () => {
    cy.get('#VersionWrapper').should("not.be.visible")
});

Then(/^List of versions should contain name of file "([^"]*)"$/,  (fileName) =>{
    cy.get('.ant-col-20').should('contain.text', fileName)
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/TestUpload.txt`, 'Good night!')
})
