// app.js
const Vue = require('vue')
const path = require('path')

const template = require('fs').readFileSync(path.resolve(__dirname, './fakeLink.html'), 'utf-8')

module.exports = function createPage () {
  return new Vue({
    template
  })
}
