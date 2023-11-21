const mdLinks = require('./index');

const testNoLinks = './testFiles/archivo-noLinks.md'
const test2Links = './testFiles/archivo-2links.md'
const testReadme = './README.md'
const testTxt = './testFiles/prueba-txt.txt'

mdLinks.mdLinks(testNoLinks)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
