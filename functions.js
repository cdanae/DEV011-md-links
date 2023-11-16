const path = require('path');
const fs = require('fs');

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

  }
}