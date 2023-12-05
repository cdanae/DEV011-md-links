const { mdLinks } = require('../src/md-links')

const relativePath = '/testFiles/archivo-2links.md'
const absolutePath = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo-2links.md'
//const noExistingDoc = '/Users/carolinarodriguez/Desktop/Laboratoria/testFiles/archivo.md'
const docExtensionTxt = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/prueba-txt.txt'
const docNonLinks = '/Users/carolinarodriguez/Desktop/Laboratoria/DEV011-md-links/testFiles/archivo-noLinks.md'

describe('mdLinks', () => {
/*   test('Rechaza la promesa si el archivo no existe', () => {
    return expect(mdLinks(noExistingDoc)).rejects.toMatch('El archivo NO existe');
  });
 */
  test('Rechaza la promesa si el archivo no es de tipo Markdown', () => {
    return expect(mdLinks(docExtensionTxt)).rejects.toMatch('El archivo no es de tipo Markdown');
  });

  test('Resuelve la promesa y extrae un array de objetos con links', () => {
    return mdLinks(absolutePath)
      .then((data) => {
        expect(data).toHaveLength(2);
      });
  });
});