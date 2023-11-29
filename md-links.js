const { default: axios } = require('axios');
const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks } = require('./functions')


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
              const links = findLinks(data)
              const extractLinksArray = extractLinks(links, absolutePath)
              if (validate) {
                const array = extractLinksArray.map((objLinks) => {
                  const url = objLinks.href;
                  return axios.get(url)
                    .then((response) => {
                      objLinks.status = response.status;
                      objLinks.ok = response.statusText;
                      return objLinks
                    })
                    .catch((error) => {
                      objLinks.status = error.response.status;
                      objLinks.ok = 'FAIL';
                      //console.log('respuestaError', error.response.status, error.response.statusText);
                      return objLinks
                    })

                })
                Promise.all(array)
                  .then((validateLinks) => {
                    resolve(validateLinks)
                  })
                  .catch(() => {
                    reject(new Error('El dominio no existe'))
                  })
              } else {
                resolve(extractLinksArray);
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

