require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASEURL,
    // specPattern: 'cypress/tests/**/*.cy.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    username: process.env.USERNAMEINPUT,
    password: process.env.PASSWORDINPUT
  }
})
