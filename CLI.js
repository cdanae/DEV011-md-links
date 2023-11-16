const mdLinks = require('./index');

// Prueba con una ruta válida
mdLinks.mdLinks('./testFiles/prueba-archivo.md')
  .then((response) => {
    // => [{ href, text, file }, ...]
    console.log('respuesta',response);
  })
  .catch((error) => {
    console.log('holis',error);
  });

