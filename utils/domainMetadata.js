const fetch = require('node-fetch')

async function getDomainMetadata(domain) {
  if(!domain) return {}

  if (domain.indexOf('://') === -1) {
    domain = 'https://' + domain;
  }

  try {
    const response = await fetch(`https://url-metadata.herokuapp.com/api/metadata?url=${domain}`)
    const data = (await response.json()).data

    data.favicon = data.favicon || `${domain}${domain.endsWith('/') ? '' : '/'}favicon.ico`
    if(data.favicon && data.favicon.startsWith('/')) {
      data.favicon = new URL(domain).origin + data.favicon
    }

    if(data.image && data.image.startsWith('/')) {
      data.image = new URL(domain).origin + data.image
    }
    return data
  } catch(e) {
    console.error(e)
    return {}
  }
}

module.exports = getDomainMetadata
