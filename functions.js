const path = require('path');
const fs = require('fs');
const marked = require('marked');
const { JSDOM } = require('jsdom');

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
      return 'No se encontraron archivos en: ' + fileName
    } else {
      const foundLinks = links.map((link) => {
        return {
          href: link.href,
          text: link.text,
          file: fileName,
        }
      });
      return foundLinks
    }    
  }
}