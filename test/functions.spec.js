const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks, validateLinks, statsLinks } = require('../src/functions')
const path = require('path')
const axios = require('axios');

jest.mock('axios');

const relativePath = './testFiles/archivo-2links.md'
const absolutePath = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo-2links.md'
const noExistingDoc = '/Users/carolinarodriguez/Desktop/Laboratoria/testFiles/archivo.md'
const docExtensionTxt = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/prueba-txt.txt'
const docNonLinks = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo-noLinks.md'
describe('convertToAbsolutePath', () => {
  test('Convierte unna ruta relativa a absoluta', () => {
    const convertedAbsolutePath = convertToAbsolutePath(relativePath)
    expect(convertedAbsolutePath).toBe(absolutePath)
  })
  test('Si recibe una ruta absoluta, devuelve la misma ruta absoluta', () => {
    const convertedAbsolutePath = convertToAbsolutePath(absolutePath)
    expect(convertedAbsolutePath).toBe(absolutePath)
  })
})

describe('checkDocExistence', () => {
  test('Si el documento existe retorna true', () => {
    const exitenceDoc = checkDocExistence(absolutePath)
    expect(exitenceDoc).toBe(true)
  })
  test('Si el documento NO existe retorna false', () => {
    const exitenceDoc = checkDocExistence(noExistingDoc)
    expect(exitenceDoc).toBe(false)
  })
})

describe('checkMdExtension', () => {
  test('Si el documento es markdown retorna true', () => {
    const docExtension = checkMdExtension(absolutePath)
    expect(docExtension).toBe(true)
  })
  test('Si el documento NO es markdown retorna false', () => {
    const docExtension = checkMdExtension(docExtensionTxt)
    expect(docExtension).toBe(false)
  })
})

describe('readDocContent', () => {
  test('El documento se lee correctamente', (done) => {
    readDocContent(absolutePath)
      .then((content) => {
        expect(content).toBeDefined()
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})
describe('findLinks', () => {
  const dataLinks = 'Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.'

  test('Encuentra el número de links en el documento', () => {
    const links = findLinks(dataLinks)
    expect(links).toHaveLength(1)
  })
  test('Extrae los links del documento por medio de la etiqueta html <a>', () => {
    const links = findLinks(dataLinks)
    expect(links[0].tagName).toBe('A')
  })
})

describe('extractLinks', () => {
  test('Si no hay links en el documento, devuelve un mensaje', () => {
    const dataNoLinks = []
    const res = extractLinks(dataNoLinks, docNonLinks)
    expect(res).toBe('No se encontraron links en: archivo-noLinks.md')
  })
  test('Muestra la info de links en un array de objetos', () => {
    const links = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'archivo-2links.md'
      },
    ]
    const res = extractLinks(links, absolutePath);
    expect(res[0]).toHaveProperty('href', 'https://es.wikipedia.org/wiki/Markdown');
    expect(res[0]).toHaveProperty('text', 'Markdown');
    expect(res[0]).toHaveProperty('file', 'archivo-2links.md');
  })
})

describe('validateLinks', () => {

  test('Deberia regresar un array de links con las propiedades status y ok', () => {
    const extractedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdon',
        text: 'Markdown',
        file: 'archivo-2links.md',
      },

    ];

    const expectedValidatedLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdon',
        text: 'Markdown',
        file: 'archivo-2links.md',
        status: 404,
        ok: 'FAIL',
      },

    ];

    const mockedResponses = [
      { status: 404, statusText: 'FAIL' }
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(mockedResponses[0]));

    return validateLinks(extractedLinks).then((validatedLinks) => {
      expect(validatedLinks).toEqual(expectedValidatedLinks);
    });
  });
})

describe('statsLinks', () => {
  const extractedLinksNoBroken = [
    { href: 'https://es.wikipedia.org/wiki/Markdown', status: 200 },
    { href: 'https://nodejs.org', status: 200 },
  ];

  const extractedLinksWithBroken = [
    { href: 'https://nodejs.org', status: 200 },
    { href: 'https://es.wikipedia.org/wiki/Markdon', status: 404 },
  ];

  test('should return correct stats without broken links', () => {
    const result = statsLinks(extractedLinksNoBroken, false);
    expect(result.Total).toBe(2);
    expect(result.Unique).toBe(2); // No hay enlaces duplicados
    expect(result.Broken).toBeUndefined(); // No se deberían contar enlaces rotos
  });

  test('should return correct stats with broken links', () => {
    const result = statsLinks(extractedLinksWithBroken, true);
    expect(result.Total).toBe(2);
    expect(result.Unique).toBe(2);
    expect(result.Broken).toBe(1);
  });

});