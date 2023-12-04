const { default: axios } = require('axios');
const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks, validateLinks } = require('./functions')


module.exports = {
  mdLinks: (docPath, validate) => {

    const absolutePath = convertToAbsolutePath(docPath)
    const docExist = checkDocExistence(absolutePath)
    const mdExtension = checkMdExtension(absolutePath)
    const readDoc = readDocContent(absolutePath)
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
              const foundLinks = findLinks(data)
              const extractedLinks = extractLinks(foundLinks, absolutePath)
              if (validate.validateOption === true) {
                console.log('que eres: true', validate);
                validateLinks(extractedLinks)
                  .then((validatedLinks) => {
                    resolve(validatedLinks)
                  })
                  .catch(() => {
                    reject(new Error('El dominio no existe'))
                  })
              } else {
                console.log('que eres: false?', validate);

                resolve(extractedLinks);
              }

            })
            .catch((err) => {
              reject(err)
            })
          break;
      }
    })
  },
};

