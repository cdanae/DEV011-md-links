#!/usr/bin/env node

const { mdLinks } = require('./md-links');
const process = require('process')

const docNoLinks = 'testFiles/archivo-noLinks.md'
const doc2Links = 'testFiles/archivo-2links.md'
const docReadme = 'README.md' // dice que el dominio no existe
const docTxt = 'testFiles/prueba-txt.txt' 
const docNonExistent = 'RDME.md'
const doc2Links1LinkError = 'testFiles/archivo-2links1error.md'

const filePath = process.argv[2]
function validacion() {
  return process.argv.includes('--validate')
}
const options = {
  validateOption: validacion(),
};
if (process.argv[3] === '--validate') {
  process.argv[3] = true;
} else {
  process.argv[3] = false;

}
console.log(process.argv);


mdLinks(filePath, options)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
