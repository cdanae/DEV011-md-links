const functions = require('./functions')

module.exports = {
  mdLinks: (docPath) => {

    const absolutePath = functions.convertToAbsolutePath(docPath)
    const docExist = functions.checkDocExistence(absolutePath)
    const mdExtension = functions.checkMdExtension(absolutePath)
    const readDoc = functions.readDocContent(absolutePath)
    // Retornar una promesa
    return new Promise((resolve, reject) => {

      switch (true) {
        case !docExist:
          reject('El archivo NO existe')
          break;
        case !mdExtension:
          reject('El archivo no es de tipo Markdown')
          break;

        default:
          readDoc
            .then((data) => {
              const links = functions.findLinks(data)
              const extractLinks = functions.extractLinks(links, absolutePath)
              resolve(extractLinks);
            })
            .catch((err) => {
              reject(err)
            })
          break;
      }
    })
  },
};

