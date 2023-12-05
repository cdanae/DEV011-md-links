const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks, validateLinks, statsLinks, validateStatsLinks } = require('./functions')


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
              if (options.validateOption  && options.statsOption) {
                validateLinks(extractedLinks)
                  .then(() => {
                    const resultValidateStats = validateStatsLinks(extractedLinks)
                    resolve(resultValidateStats)
                  })
                  .catch(() => {
                    reject(new Error('No hay red o el dominio no existe'))
                  })
                
                console.log('Funciona');
              } else if(options.statsOption) {
                const resultStats = statsLinks(extractedLinks)
                resolve(resultStats)
              } else if (options.validateOption) {
                validateLinks(extractedLinks)
                  .then((validatedLinks) => {
                    resolve(validatedLinks)
                  })
                  .catch(() => {
                    reject(new Error('No hay red o el dominio no existe'))
                  })
                
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

