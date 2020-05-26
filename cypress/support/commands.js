import 'cypress-file-upload';
import { sha256 } from 'js-sha256'
import { getCSR } from '../../src/utils/functions'
const generator = require('generate-password');
import fs from 'fs';

// var chai = require('chai')
//     , chaiHttp = require('chai-http');
//
// chai.use(chaiHttp);

const basic = 'http://localhost:1823/api/v1/user'
const headers = {'content-type': 'application/json'}

let login = generator.generate({length: 15});
let email = `${login.toLowerCase()}@gmail.com`;
let password = sha256(`${login}12345`);
let csr = getCSR({username: login})
let user

Cypress.Commands.add('registerUser', () => {
    cy.request({
        method: 'POST',
        url: basic,
        headers: headers,
        body: {
            'login': login,
            'email': email,
            'password': password,
            'CSR': csr.csrPem
        },
    }).then((resp) => {
        user = resp
        console.log(user.body)
        cy.writeFile('cypress/fixtures/cert.pem', resp.body.cert).then(() => {
            cy.writeFile('cypress/fixtures/privateKey.pem', csr.privateKeyPem)
        })
    }).as('Register')
})

Cypress.Commands.add('loginAsNewUser', () => {
    cy.readFile('cypress/fixtures/cert.pem').then((certificate) => {
        cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
            cy.request({
                method: 'POST',
                url: basic + '/auth',
                headers: headers,
                body: {
                    'login': login,
                    'password': password,
                    'certificate': certificate,
                    'privateKey': key,
                },
            }).then((res) => {
                user = res
                console.log(res)
            })
        }).as('Login')
            .visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', user.body.token)
                win.localStorage.setItem('rootFolder', user.body.folder)

            },
        }).as('Set user token')
    })
})

Cypress.Commands.add('createFolder', (folderName) => {
    headers.Authorization = 'Bearer ' + user.body.token
    cy.request({
        method: 'POST',
        url: 'http://localhost:1823/api/v1/folder',
        headers: headers,
        body: {
            'name': folderName,
            'parentFolder':  user.body.folder
        },
    }).then((resp) => {
        console.log(resp.body)
    }).as('Create folder')
})


Cypress.Commands.add('uploadFile',  () => {
    // headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiSXFydHpybHdCTFZYYndGIiwiaXNzdWVyIjoiNDgyc29sdXRpb25zIiwiaWF0IjoxNTkwMzk1MDI1LCJleHAiOjE1OTAzOTg2MjV9.3jhReZ3mmi7HZPaMLMmDtwcVmPWnyHGIEXgZqrcqkLU'//user.body.token

    // chai.request('http://localhost:1823/api/v1')
    //     .post('/file')
    //     .field('name', 'parentFolder')
    //     .field('parentFolder', '42cb70ff5c87530bd0aba466bdb0534c8d61e234676bfbfe885da6f2cf4e79b2')
    //     .attach('file', fs.readFile('cypress/fixtures/test.txt'), 'test.txt')
    //     .then((result) => {
    //         expect(result).to.have.status(200)
    //     })
});

Cypress.Commands.add('userAuth', () => {
    expect(sha256(login)).to.equal(localStorage.rootFolder)
})