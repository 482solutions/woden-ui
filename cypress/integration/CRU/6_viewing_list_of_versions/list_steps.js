import {Then} from 'cypress-cucumber-preprocessor/steps';


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
    cy.get('.fileInfoWrapper').should('contain.text', fileName)
});

afterEach(() => {
    cy.writeFile(`cypress/fixtures/TestUpload.txt`, 'Good night!')
})
