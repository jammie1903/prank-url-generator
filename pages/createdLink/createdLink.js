// app.js
const Vue = require('vue')
const path = require('path')

const template = require('fs').readFileSync(path.resolve(__dirname, './createdLink.html'), 'utf-8')

module.exports = function createPage ({generatedUrl}) {
  return new Vue({
    template,
    data: {
      generatedUrl
    }
  })
}
