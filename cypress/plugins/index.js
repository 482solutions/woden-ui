const cucumber = require('cypress-cucumber-preprocessor').default
// const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = (on) => {
  on('file:preprocessor', cucumber())
  // on('task', {downloadFile})
}
