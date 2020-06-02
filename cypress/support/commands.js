import 'cypress-file-upload';
import {sha256} from 'js-sha256'
import {getCSR} from '../../src/utils/functions'

const generator = require('generate-password');

const basic = 'http://localhost:1823/api/v1'
const headers = {'content-type': 'application/json'}

let login = generator.generate({length: 15});
let email = `${login.toLowerCase()}@gmail.com`;
let password = sha256(`${login}12345`);
let csr = getCSR({username: login})

let user
let folderData

Cypress.Commands.add('registerUser', () => {
    cy.request({
        method: 'POST',
        url: `${basic}/user`,
        headers: headers,
        body: {
            'login': login,
            'email': email,
            'password': password,
            'CSR': csr.csrPem
        },
    }).then((resp) => {
        user = resp
        // console.log(user.body)
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
                url: `${basic}/user/auth`,
                headers: headers,
                body: {
                    'login': login,
                    'password': password,
                    'certificate': certificate,
                    'privateKey': key,
                },
            }).then((res) => {
                user = res
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
    headers.Authorization = `Bearer ${user.body.token}`
    console.log(user.body.token)
    cy.request({
        method: 'POST',
        url: `${basic}/folder`,
        headers: headers,
        body: {
            'name': folderName,
            'parentFolder': user.body.folder
        },
    }).then((resp) => {
        console.log(resp.body)
    }).as('Create folder')
})

Cypress.Commands.add('uploadFile', () => {
    cy.readFile('cypress/fixtures/image.png', 'base64').then((logo) => {
        Cypress.Blob.base64StringToBlob(logo, 'image/png').then((blob) => {
            const myHeaders = new Headers();
            myHeaders.set("Authorization", `Bearer ${user.body.token}`);

            let formData = new FormData();
            formData.append("name", "1file");
            formData.append("parentFolder", user.body.folder);
            formData.append("file", blob);

            fetch(`${basic}/file`, {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow'
            }).then(response => response.json())
                .then(result => expect(login).to.equal(result.folder.name))
                .catch(error => console.log('error', error));
        })
    })
})

Cypress.Commands.add('uploadTxtFile', (fullName, text) => {
    cy.writeFile(`cypress/fixtures/${fullName}`, text).as('Write text to the file')
    cy.readFile(`cypress/fixtures/${fullName}`).then((str) => {

        expect(text).to.equal(text)

        let blob = new Blob([str], {type: 'text/plain'})
        const myHeaders = new Headers();
        myHeaders.set("Authorization", `Bearer ${user.body.token}`);

        let formData = new FormData()
        formData.append('name', fullName)
        formData.append('parentFolder', user.body.folder)
        formData.append('file', blob)

        fetch(`${basic}/file`, {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        }).then((response) => {
            console.log(response.status)
            return Promise.resolve(response)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            expect(login).to.equal(data.folder.name)
            folderData = data
            console.log(data)
        })
    }).as('Send txt').wait(2000)
})

Cypress.Commands.add('userAuth', () => {
    expect(sha256(login)).to.equal(localStorage.rootFolder)
})

Cypress.Commands.add('inRootFolder', () => {
    cy.get('.currentFolder').should('contain.text', 'My Drive')
})

Cypress.Commands.add('createFolder', (name) => {
    headers.Authorization = 'Bearer ' + user.body.token
    cy.request({
        method: 'POST',
        url: basic + '/folder',
        headers: headers,
        body: {
            'name': name,
            'parentFolder': sha256(login)
        },
    }).then((resp) => {
        expect(resp.status).to.eq(201)
        return resp
    })
})

Cypress.Commands.add('getHashFromFile', (fileName) => {
    let files = JSON.parse(folderData.folder.files)
    for (let key in files) {
        if (fileName === files[key].name) {
            return files[key].hash
            //TODO add CID
        }
    }
})
