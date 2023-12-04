const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks, validateLinks, statsLinks } = require('./functions')


module.exports = {
  mdLinks: (docPath, options) => {

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
              if (options.validateOption) {
                validateLinks(extractedLinks)
                  .then((validatedLinks) => {
                    resolve(validatedLinks)
                  })
                  .catch(() => {
                    reject(new Error('No hay red o el dominio no existe'))
                  })
              } else if(options.statsOption) {
                const resultStats = statsLinks(extractedLinks)
                resolve(resultStats)
              }
              else {
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

