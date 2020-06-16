import './commands'
require('cypress-plugin-retries')

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
