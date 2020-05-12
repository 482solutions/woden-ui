// import { Then } from "cypress-cucumber-preprocessor/steps";
//
// let privateKey;
//
// Then(/^The User got private key$/, async () => {
//   cy.get('a[download]')
//     .then((anchor) => (
//       new Cypress.Promise((resolve) => {
//         //XHR to get the blob that corresponds to the object URL.
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', anchor.prop('href'), true);
//         xhr.responseType = 'blob';
//         //fileReader to get the string back from the blob.
//         xhr.onload = () => {
//           if (xhr.status === 200) {
//             const blob = xhr.response;
//             const reader = new FileReader();
//             reader.onload = () => {
//               resolve(reader.result);
//               privateKey = cy.writeFile('cypress/fixtures/privateKey.pem', reader.result)
//             };
//             reader.readAsText(blob);
//           }
//         };
//         xhr.send();
//       })
//     ))
//   cy.readFile('cypress/fixtures/privateKey.pem').then((text) => {
//     expect(text).to.include('-----BEGIN PRIVATE KEY-----')
//     expect(text).to.include('-----END PRIVATE KEY-----');
//   })
// });
