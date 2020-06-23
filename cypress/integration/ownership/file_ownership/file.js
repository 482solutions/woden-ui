import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import {getCSR} from "../../../../src/utils/functions";
import {getHashFromFile, getLogin, getPassword} from "../../../support/commands";

const URL = 'http://localhost:1823/api/v1'
const headers = {'content-type': 'application/json'}

Given(/^Register without UI user2$/, () => {
    Cypress.env('login_2', getLogin())
    Cypress.env('password_2', getPassword(8, true))
    Cypress.env('email_2', getLogin() + '@gmail.com')

    let csr = getCSR({username: Cypress.env('login_2')})
    cy.writeFile('cypress/fixtures/privateKey_2.pem', csr.privateKeyPem)
        .readFile('cypress/fixtures/privateKey_2.pem')
        .then((text) => {
            expect(text).to.include('-----BEGIN PRIVATE KEY-----')
            expect(text).to.include('-----END PRIVATE KEY-----')
        })
    cy.readFile('cypress/fixtures/privateKey_2.pem').then((key) => {
        cy.request({
            method: 'POST',
            url: `${URL}/user`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'login': Cypress.env('login_2'),
                'email': Cypress.env('email_2'),
                'password': Cypress.env('password_2'),
                'privateKey': key,
                'CSR': csr.csrPem
            },
        }).then((resp) => {
            if (expect(201).to.eq(resp.status)) {
                Cypress.env('respStatus', resp.status)
                cy.writeFile('cypress/fixtures/cert_2.pem', resp.body.cert).then(() => {
                    cy.readFile('cypress/fixtures/cert_2.pem').then((text) => {
                        expect(text).to.include('-----BEGIN CERTIFICATE-----')
                        expect(text).to.include('-----END CERTIFICATE-----')
                    })
                })
            }
        })
    }).as('Register user2')
});

Given(/^The user 1 is the owner of the file$/, () => {
    cy.wait('@getFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        expect(xhr.responseBody.folder.ownerId).to.equal(Cypress.env('login'))
    })
});

Given(/^Enter User 2 email$/, () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type(Cypress.env('email_2'))
});

Given(/^Choose the "([^"]*)" option from pop\-up window$/, (option) => {
    cy.get('.ant-modal-header').should('be.visible')
    cy.get('#form_in_modal_permissions').should('be.visible').click().wait(1000)
    cy.contains(option).click(1000)
});

Given(/^Press "([^"]*)"$/, (confirm) => {
    cy.server()
    cy.route('PUT', '/api/v1/permissions').as('ownership')
    cy.contains(confirm).click()
});

Then(/^Login as new user 2 without UI$/, () => {
    cy.wait(4000)
    cy.readFile('cypress/fixtures/cert_2.pem').then((certificate) => {
        cy.readFile('cypress/fixtures/privateKey_2.pem').then((key) => {
            cy.request({
                method: 'POST',
                url: `${URL}/user/auth`,
                headers: headers,
                body: {
                    'login': Cypress.env('login_2'),
                    'password': Cypress.env('password_2'),
                    'certificate': certificate,
                    'privateKey': key,
                },
            }).then((resp) => {
                if (expect(200).to.eq(resp.status)) {
                    Cypress.env('token_2', resp.body.token)
                    Cypress.env('respStatus', resp.status)
                    Cypress.env('rootFolder_2', resp.body.folder)
                }
            })
        }).as('Login as user 2')

        cy.server()
        cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
            .visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', Cypress.env('token_2'))
                    win.localStorage.setItem('rootFolder', Cypress.env('rootFolder_2'))
                },
            }).as('Set user2 token')
    })
});
Then(/^Message about transfer ownership "([^"]*)"$/, (text) => {
    cy.wait('@ownership').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        console.log(xhr)
        cy.get('.ant-message-notice-content').should('contain.text', text)
    })
});

Then(/^User 2 became Owner of "([^"]*)" file$/, (file) => {
    cy.wait('@getRootFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        console.log(xhr.responseBody)
        expect(1).to.equal(xhr.responseBody.folder.files.length)
        cy.contains(file).should('be.visible')
    })
});

Then(/^User 1 has Editors rights to "([^"]*)" file$/, (fileName) => {
    cy.loginAsNewUser()
    cy.wait('@getRootFolder').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')

        cy.get('.shared').click()

        const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))
        cy.get(`#Actions_${hashFile}`).click().wait(1000)
        cy.get(`#Update_${hashFile}`).click().wait(1000)
        cy.server()
        cy.route('PUT', '/api/v1/file').as('updateFile')
        cy.get(`#Update_${hashFile} input[type=file]`).attachFile(fileName);
        cy.get('.ant-message-notice-content').should('be.visible')

        cy.wait('@updateFile').then((xhr) => {
            expect(xhr.responseBody).to.not.have.property('stack')
            cy.get('.ant-message-custom-content').as('File updated successfully')
                .should('be.visible')
                .should("contain.text", 'File updated successfully')
        })
    })
});
Given(/^Enter "([^"]*)"$/, (invalidEmail) => {
    cy.get('#form_in_modal_username').should('be.visible').type(invalidEmail)
});

Then(/^Error message "([^"]*)"$/, (message) => {
    cy.wait('@ownership').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-custom-content').as(message)
            .should('be.visible')
            .should("contain.text", message)
    })
});
When(/^Enter email user 1$/, () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type(Cypress.env('email'))
});

Then(/^Warning message "([^"]*)"$/, (message) => {
    cy.wait('@ownership').then((xhr) => {
        expect(xhr.responseBody).to.not.have.property('stack')
        cy.get('.ant-message-custom-content').as(message)
            .should('be.visible')
            .should("contain.text", message)
    })
});
Given(/^Register without UI user3$/, () => {
    Cypress.env('login_3', getLogin())
    Cypress.env('password_3', getPassword(8, true))
    Cypress.env('email_3', getLogin() + '@gmail.com')

    let csr = getCSR({username: Cypress.env('login_3')})
    cy.writeFile('cypress/fixtures/privateKey_3.pem', csr.privateKeyPem)
        .readFile('cypress/fixtures/privateKey_3.pem')
        .then((text) => {
            expect(text).to.include('-----BEGIN PRIVATE KEY-----')
            expect(text).to.include('-----END PRIVATE KEY-----')
        })
    cy.readFile('cypress/fixtures/privateKey_3.pem').then((key) => {
        cy.request({
            method: 'POST',
            url: `${URL}/user`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'login': Cypress.env('login_3'),
                'email': Cypress.env('email_3'),
                'password': Cypress.env('password_3'),
                'privateKey': key,
                'CSR': csr.csrPem
            },
        }).then((resp) => {
            if (expect(201).to.eq(resp.status)) {
                Cypress.env('respStatus', resp.status)
                cy.writeFile('cypress/fixtures/cert_3.pem.pem', resp.body.cert).then(() => {
                    cy.readFile('cypress/fixtures/cert_3.pem.pem').then((text) => {
                        expect(text).to.include('-----BEGIN CERTIFICATE-----')
                        expect(text).to.include('-----END CERTIFICATE-----')
                    })
                })
            }
        })
    }).as('Register user3')
});

When(/^Enter email user2 and user3 in field "([^"]*)"$/, () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type(`${Cypress.env('email_2')}, ${Cypress.env('email_3')}`)
});

Then(/^Notification below the field "([^"]*)"$/, (text) => {
    cy.get('.ant-form-item-explain').should('contain.text', text)
});

When(/^Field email is empty$/, () => {
    cy.get('#form_in_modal_username').should('be.empty')
});

When(/^Enter spaces in field email$/, () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type('       ')
});
When(/^Enter username of user2 in field email$/,  () => {
    cy.get('#form_in_modal_username').should('be.visible')
        .type(Cypress.env('login_2'))
});