import 'cypress-file-upload';
import {generate} from 'generate-password'
import {getCSR} from '../../src/utils/functions'
import {sha256} from 'js-sha256'

const URL = 'http://localhost:1823/api/v1'
const headers = {'content-type': 'application/json'}

export function getPassword(length, sha) {
    if (sha === true) {
        return sha256(generate({
            length: length,
            numbers: true,
            symbols: true,
            lowercase: true,
            uppercase: true,
        }))
    }
    if (sha === false) {
        return generate({
            length: length,
            numbers: true,
            symbols: false,
            lowercase: true,
            uppercase: true,
        }) + "!!"
    }
}

export function getLogin() {
    return generate({
        length: 12,
        lowercase: true,
        uppercase: true,
    })
}

export function getHashFromFile(fileName, files) {
    for (let key in files) {
        if (fileName === files[key].name) {
            return files[key].hash
        }
    }
}

Cypress.Commands.add('registerUser', () => {
    Cypress.env('login', getLogin())
    Cypress.env('password', getPassword(8, true))
    Cypress.env('email', getLogin() + '@gmail.com')

    let csr = getCSR({username: Cypress.env('login')})
    cy.writeFile('cypress/fixtures/privateKey.pem', csr.privateKeyPem)
        .readFile('cypress/fixtures/privateKey.pem')
        .then((text) => {
            expect(text).to.include('-----BEGIN PRIVATE KEY-----')
            expect(text).to.include('-----END PRIVATE KEY-----')
        })
    cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
        cy.request({
            method: 'POST',
            url: `${URL}/user`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                'login': Cypress.env('login'),
                'email': Cypress.env('email'),
                'password': Cypress.env('password'),
                'privateKey': key,
                'CSR': csr.csrPem
            },
        }).then((resp) => {
            if (expect(201).to.eq(resp.status)) {
                Cypress.env('respStatus', resp.status)
                cy.writeFile('cypress/fixtures/cert.pem', resp.body.cert).then(() => {
                    cy.readFile('cypress/fixtures/cert.pem').then((text) => {
                        expect(text).to.include('-----BEGIN CERTIFICATE-----')
                        expect(text).to.include('-----END CERTIFICATE-----')
                    })
                })
            }
        })
    }).as('Register new user')
})

Cypress.Commands.add('loginAsNewUser', () => {
    cy.readFile('cypress/fixtures/cert.pem').then((certificate) => {
        cy.readFile('cypress/fixtures/privateKey.pem').then((key) => {
            cy.request({
                method: 'POST',
                url: `${URL}/user/auth`,
                headers: headers,
                body: {
                    'login': Cypress.env('login'),
                    'password': Cypress.env('password'),
                    'certificate': certificate,
                    'privateKey': key,
                },
            }).then((resp) => {
                if (expect(200).to.eq(resp.status)) {
                    Cypress.env('token', resp.body.token)
                    Cypress.env('respStatus', resp.status)
                    Cypress.env('rootFolder', resp.body.folder)
                }
            })
        }).as('Login')

        cy.server()
        cy.route('GET', '/api/v1/folder/*').as('getRootFolder')
            .visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', Cypress.env('token'))
                    win.localStorage.setItem('rootFolder', Cypress.env('rootFolder'))
                },
            }).as('Set user token')
    })
})

Cypress.Commands.add('uploadFile', (fullFileName) => {
    cy.server()
    cy.route('POST', '/api/v1/file').as('uploadFile')
    cy.readFile(`cypress/fixtures/${fullFileName}`).then(async (str) => {
        let blob = new Blob([str], {type: 'text/plain'})

        let formData = new FormData()
        formData.append('name', fullFileName)
        formData.append('parentFolder', Cypress.env('rootFolder'))
        formData.append('file', blob)

        const token = Cypress.env('token')
        const resp = await fetch(`${URL}/file`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`
            }),
            body: formData,
            redirect: 'follow'
        })
        const result = await resp.json()
        if (expect(200).to.eq(resp.status)) {
            Cypress.env('respStatus', result.status)
            Cypress.env('filesInRoot', result.folder.files)
            expect(Cypress.env('login')).to.equal(result.folder.folderName)
        }
    })
})

Cypress.Commands.add('updateTxtFile', (fileName) => {
    const textBefore = 'Good night!'
    const textAfter = 'Good morning!'

    const hashFile = getHashFromFile(fileName, Cypress.env('filesInRoot'))

    cy.readFile(`cypress/fixtures/${fileName}`).then((str1) => {
        expect(str1).to.equal(textBefore)

        cy.writeFile(`cypress/fixtures/${fileName}`, textAfter).as('Write text to the file')
        cy.readFile(`cypress/fixtures/${fileName}`).then((str2) => {

            expect(str2).to.equal(textAfter)

            let blob = new Blob([str2], {type: 'text/plain'})

            const myHeaders = new Headers({
                'Authorization': `Bearer ${Cypress.env('token')}`
            })

            let formData = new FormData()
            formData.append('hash', hashFile)
            formData.append('file', blob)

            fetch(`${URL}/file`, {
                method: 'PUT',
                headers: myHeaders,
                body: formData,
            }).then((resp) => {
                Cypress.env('respStatus', resp.status)
                return Promise.resolve(resp)
            })
                .then((resp) => {
                    return resp.json()
                })
                .then((data) => {
                    console.log(data)
                    expect(Cypress.env('login')).to.equal(data.file.ownerId)
                    expect(fileName).to.equal(data.file.fileName)
                    // const fileHash = data.file.fileHash
                    Cypress.env('versions', data.file.versions)
                })
        }).as('Update txt file').wait(6000)
    })
})

Cypress.Commands.add('userAuth', () => {
    expect(Cypress.env('rootFolder')).to.equal(localStorage.rootFolder)
})

Cypress.Commands.add('inRootFolder', () => {
    cy.get('.currentFolder').should('contain.text', 'My Drive')
})

Cypress.Commands.add('createFolderInRoot', (name) => {
    headers.Authorization = `Bearer ${Cypress.env('token')}`
    cy.request({
        method: 'POST',
        url: `${URL}/folder`,
        headers: headers,
        body: {
            'name': name,
            'parentFolder': Cypress.env('rootFolder')
        },
    }).then((resp) => {
        Cypress.env('foldersInRoot', resp.body.folder.folders)
        expect(resp.status).to.eq(201)
    })
})

Cypress.Commands.add('createFolderInFolder', (newFolder, oldFolder) => {
    const folders = Cypress.env('foldersInRoot')
    headers.Authorization = `Bearer ${Cypress.env('token')}`

    for (let key in folders) {
        if (oldFolder === folders[key].name) {
            cy.request({
                method: 'POST',
                url: `${URL}/folder`,
                headers: headers,
                body: {
                    'name': newFolder,
                    'parentFolder': folders[key].hash
                },
            }).then((resp) => {
                expect(resp.status).to.eq(201)
            })
        }
    }
})