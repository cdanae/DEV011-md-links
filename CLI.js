const mdLinks = require('./index');

const docNoLinks = './testFiles/archivo-noLinks.md'
const doc2Links = './testFiles/archivo-2links.md'
const docReadme = './README.md'
const docTxt = './testFiles/prueba-txt.txt'
const docNonExistent = './RDME.md'

mdLinks.mdLinks(doc2Links)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
