
function descriptionMetadata(description) {
  return description ? `
    <meta property="og:description" name="twitter:description" content="${description}">
  ` : ''
}

function imageMetadata(image) {
  return image ? `
    <meta property="og:image" name="twitter:image" content="${image}">
    <meta name="twitter:card" content="summary_large_image">
  ` : ''
}

function siteNameMetadata(siteName) {
  return siteName ? `
    <meta property="og:siteName" content="${siteName}">
  ` : ''
}

function faviconMetadata(favicon) {
  return favicon ? `
    <link rel="icon" href="${favicon}">
  ` : ''
}

function themeColorMetadata(themeColor) {
  return themeColor ? `
    <meta name="theme-color" content="${themeColor}">
  ` : ''
}

function typeMetadata(type) {
  return `
    <meta property="og:type" content="${type || 'website'}" />
  `
}

function urlMetadata(url) {
  return url ? `
    <meta property="og:url" content="${url}" />
  ` : ''
}

module.exports = {
  descriptionMetadata,
  imageMetadata,
  siteNameMetadata,
  faviconMetadata,
  themeColorMetadata,
  typeMetadata,
  urlMetadata
}
