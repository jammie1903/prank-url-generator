const {
  descriptionMetadata,
  imageMetadata,
  siteNameMetadata,
  faviconMetadata,
  themeColorMetadata,
  typeMetadata
} = require('./metadata')

function createContext(metadata) {
  const {title, description, image, siteName, favicon, themeColor, type} = metadata

  return {
    title: title || siteName || 'Title',
    meta: [
      descriptionMetadata(description),
      imageMetadata(image),
      siteNameMetadata(siteName),
      faviconMetadata(favicon),
      themeColorMetadata(themeColor),
      typeMetadata(type)
    ].join('')
  }
}

module.exports = createContext
