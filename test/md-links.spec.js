const { mdLinks } = require('../src/md-links')
const fs = require('fs');
const { convertToAbsolutePath, checkDocExistence, checkMdExtension, readDocContent, findLinks, extractLinks } = require('../src/functions')

const absolutePath = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo-2links.md'
const noExistingDoc = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo.md'
const docExtensionTxt = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/prueba-txt.txt'

const mockDataLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'archivo-2links.md'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'archivo-2links.md'
  }
]

const optionsTrue = {
  validateOption: true,
  statsOption: true,
}

const mockData = '## 1. Preámbulo [Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`). Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir. Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas. ![md-links](https://github.com/Laboratoria/curriculum/assets/12631491/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4)'

describe('mdLinks', () => {
  /*   test('Rechaza la promesa si el archivo no existe', () => {
      return expect(mdLinks(noExistingDoc)).rejects.toMatch('El archivo NO existe');
    }); */
  test('Rechaza la promesa si el archivo no es de tipo Markdown', () => {
    return expect(mdLinks(docExtensionTxt)).rejects.toMatch('El archivo no es de tipo Markdown');
  });
  test('Debería simular la lectura de un archivo', (done) => {
    const mockReadFile = jest.spyOn(fs, 'readFile');
    mdLinks(absolutePath, optionsTrue)
      .then((result) => {

        expect(result).toEqual({ Total: 2, Unique: 2, Broken: 0 });
        done();
      })
      .catch((error) => {
        done(error);
      });
    mockReadFile.mockRestore();
  });
});