const TinyURL = require('tinyurl');
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const Main = require('./pages/main')
const CreatedLink = require('./pages/createdLink')
const FakeLink = require('./pages/fakeLink')

const getDomainMetadata = require('./utils/domainMetadata')
const createContext = require('./utils/context')

async function createMetadata(data) {
  const domainData = await getDomainMetadata(data.domain)
  return Object.assign(domainData, data)
}

app.get('/', async (req, res) => {
  const app = Main()

  const metadata = await createMetadata({
    title: 'Prank Url Maker',
    description: 'This is a site to help create a fake link with metadata to send to a friend (or enemy!).'
  })
  const context = createContext(metadata)

  render(app, context, res)
})

app.post('/create', async (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host')
  const metadata = await createMetadata(req.body)
  const {title, description, image, siteName, favicon, themeColor, type} = metadata
  const params = new URLSearchParams({title, description, image, siteName, favicon, themeColor, type}).toString()
  const generatedUrl = fullUrl + '/view?' + params

  TinyURL.shorten(generatedUrl, function(url, err) {
    if (err)
      console.error(err)
    
    const app = CreatedLink({
      generatedUrl: url || generatedUrl,
    })
  
    const context = createContext({
      title: 'Success // Prank Url Maker',
    })
  
    render(app, context, res)
  })
})

app.get('/view', async (req, res) => {
  const app = FakeLink()
  const context = createContext(req.query)
  render(app, context, res)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function render(app, context, res) {
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.error(err)
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
}
