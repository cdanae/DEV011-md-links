const { mdLinks } = require('./md-links');

const docNoLinks = './testFiles/archivo-noLinks.md'
const doc2Links = './testFiles/archivo-2links.md'
const docReadme = './README.md'
const docTxt = './testFiles/prueba-txt.txt'
const docNonExistent = './RDME.md'
const doc2Links1LinkError = './testFiles/archivo-2links1error.md'

mdLinks(doc2Links1LinkError, true)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
