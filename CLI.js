const mdLinks = require('./index');  

// Prueba con una ruta válida
mdLinks.mdLinks('./prueba-archivo.md')
  .then(() => {
    // => [{ href, text, file }, ...]
    console.log('La ruta existe');
  })
  .catch(() => {
    console.log('La ruta NO existe');
  });

