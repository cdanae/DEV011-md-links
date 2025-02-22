const path = require('path');
const fs = require('fs');
const marked = require('marked');
const { JSDOM } = require('jsdom');
const axios = require('axios').default;

module.exports = {
  convertToAbsolutePath: (docPath) => {
    return path.resolve(docPath)
  },
  checkDocExistence: (absolutePath) => {
    return fs.existsSync(absolutePath)
  },
  checkMdExtension: (absolutePath) => {
    const mdExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text']
    const extension = path.extname(absolutePath).toLowerCase()

    return mdExtensions.includes(extension)
  },
  readDocContent: (absolutePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(absolutePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  findLinks: (data) => {
    const html = marked.parse(data);
    const dom = new JSDOM(html).window.document
    const links = Array.from(dom.querySelectorAll('a'))
    return links;
  },
  extractLinks: (links, absolutePath) => {
    const fileName = path.basename(absolutePath)
    if (links.length === 0) {
      return 'No se encontraron links en: ' + fileName
    } else {
      const filterLinks = links.filter(link => link.href.includes('https://') || link.href.includes('http://'))
      const foundLinks = filterLinks.map((link) => ({
        href: link.href,
        text: link.text,
        file: fileName,
      }))

      return foundLinks
    }
  },
  validateLinks: (extractedLinks) => {
    return Promise.all(extractedLinks.map((objLink) => {
      const url = objLink.href;
      return axios.get(url)
        .then((response) => {
          objLink.status = response.status;
          objLink.ok = response.statusText;
          return objLink;
        })
        .catch((error) => {
          objLink.status = error.response.status;
          objLink.ok = 'FAIL';
          return objLink;
        })

    }))

  },
  statsLinks: (extractedLinks, valStatsLinks) => {
    const totalLinks = extractedLinks.length
    const uniqueLinks = new Set(extractedLinks.map(link => link.href))
    const stats = {
      Total: totalLinks,
      Unique: uniqueLinks.size,
    }
    if (valStatsLinks) {
      const brokenLinks = extractedLinks.filter(link => link.status !== 200);
      stats.Broken = brokenLinks.length
    }
    return stats
  },
}