import 'cypress-file-upload';
import {generate} from 'generate-password'
import {sha256} from 'js-sha256'

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
    length: 10,
    lowercase: true,
    uppercase: true,
  });
}
export function getHash(name, array) {
  for (let key in array) {
    if (name === array[key].name) {
      return array[key].hash;
    }
  }
}

export function getFolderOwner(folderName, arrFolders) {
  for (let key in arrFolders) {
    if (folderName === arrFolders[key].folderName) {
      return arrFolders[key].ownerId;
    }
  }
}

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
    const resp = await fetch(`${Cypress.env('backendURL')}/file`, {
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
      expect(Cypress.env('login')).to.equal(result.folder.ownerId)
    }
  })
})

Cypress.Commands.add('updateTxtFile', (fileName) => {
  const textBefore = 'Good night!'
  const textAfter = 'Good morning!'

  const hashFile = getHash(fileName, Cypress.env('filesInRoot'))

  cy.readFile(`cypress/fixtures/${fileName}`).then((str1) => {
    expect(str1).to.equal(textBefore)

    cy.writeFile(`cypress/fixtures/${fileName}`, textAfter).as('Write text to the file')
    cy.readFile(`cypress/fixtures/${fileName}`).then((str2) => {

      expect(str2).to.include(textAfter)

      let blob = new Blob([str2], {type: 'text/plain'})

      const myHeaders = new Headers({
        'Authorization': `Bearer ${Cypress.env('token')}`
      })

      let formData = new FormData()
      formData.append('hash', hashFile)
      formData.append('file', blob)

      fetch(`${Cypress.env('backendURL')}/file`, {
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
          expect(Cypress.env('login')).to.equal(data.file.ownerId)
          expect(fileName).to.equal(data.file.fileName)
          Cypress.env('versions', data.file.versions)
        })
    }).as('Update txt file').wait(6000)
  })
})

export function createFolderInRoot(name) {
  headers.Authorization = `Bearer ${Cypress.env('token')}`
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendURL')}/folder`,
    headers: headers,
    body: {
      'name': name,
      'parentFolder': Cypress.env('rootFolder')
    },
  }).then((resp) => {
    expect(resp.status).to.eq(201)
    Cypress.env('foldersInRoot', resp.body.folder.folders)
  })
}

Cypress.Commands.add('createFolderInFolder', (newFolder, oldFolder) => {
  const folders = Cypress.env('foldersInRoot')
  headers.Authorization = `Bearer ${Cypress.env('token')}`

  for (let key in folders) {
    if (oldFolder === folders[key].name) {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendURL')}/folder`,
        headers: headers,
        body: {
          'name': newFolder,
          'parentFolder': folders[key].hash
        },
      }).then((resp) => {
        expect(resp.status).to.eq(201)
        Cypress.env('foldersInRoot', resp.body.folder.folders)
        Cypress.env('rootFolder', resp.body.folder.folderHash)
      })
    }
  }
})
