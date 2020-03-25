const {
  descriptionMetadata,
  imageMetadata,
  siteNameMetadata,
  faviconMetadata,
  themeColorMetadata,
  typeMetadata,
  urlMetadata
} = require('./metadata')

function createContext(metadata) {
  const {title, description, image, siteName, favicon, themeColor, type, domain} = metadata

  return {
    title: title || siteName || 'Title',
    meta: [
      descriptionMetadata(description),
      imageMetadata(image),
      siteNameMetadata(siteName),
      faviconMetadata(favicon),
      themeColorMetadata(themeColor),
      typeMetadata(type),
      urlMetadata(domain)
    ].join('')
  }
}

module.exports = createContext
