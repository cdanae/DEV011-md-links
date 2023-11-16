const fs = require('fs');
const path = require('path');

module.exports = {
  mdLinks: (docPath) => {
    console.log(docPath);

    // Convertir ruta a absoluta
    const absolutePath = path.resolve(docPath)
    console.log(absolutePath);

    // Retornar una promesa
    return new Promise( (resolve, reject) => {

      //Verificar que exista la ruta del archivo
      if(!fs.existsSync(absolutePath)) {
        return reject()
      } 
      return resolve()
    }) 
    //fs.readFile()
  },
};

