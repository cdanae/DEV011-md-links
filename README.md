# Markdown Links

## Índice

* [1. Uso](#1-uso)
* [2. Estructura](#2-estructura)
* [3. Archivos principales](#3-archivos-principales)
* [4. Pruebas](#4-pruebas)
* [5. Dependencias](#5-dependencias)
* [6. Comandos de prueba](#6-comandos-de-prueba)
***

## 1. Uso

El comando md-links te permite analizar archivos Markdown para extraer y 
mostrar información sobre los enlaces que contienen. A continuación se 
muestra la sintaxis general para ejecutar md-links:

`md-links <path-to-file> [options]`

* `<path-to-file>`: Ruta del archivo o directorio a analizar.
* `[options]`: Opciones que se pueden incluir para obtener resultados específicos:
    * `--validate`: Realiza una validación de cada enlace encontrado, verificando su estado 
    y mostrando si es válido o no.
    * `--stats`: Muestra estadísticas básicas sobre los enlaces encontrados, como el 
    total de enlaces y los enlaces únicos.

### **Ejemplos de Uso:**
**Ejemplo 1**: Analizar un archivo Markdown sin validación de enlaces:

`md-links archivo.md`

Este comando analizará el archivo archivo.md en busca de enlaces y mostrará información 
detallada sobre cada enlace encontrado, incluyendo la URL y el texto de anclaje.

**Ejemplo 2**: Analizar un archivo Markdown con validación de enlaces:

`md-links archivo.md --validate`

Al agregar la opción --validate, md-links realizará una validación de cada enlace encontrado. 
Mostrará información adicional sobre cada enlace, incluyendo el estado de validez, indicando 
si el enlace es válido o no.

**Ejemplo 3**: Mostrar estadísticas de los enlaces encontrados en un archivo Markdown:

`md-links archivo.md --stats`

La opción --stats generará estadísticas básicas sobre los enlaces encontrados en el archivo 
archivo.md. Mostrará el total de enlaces y los enlaces únicos.

**Ejemplo 4**: Combinar opciones para validar y mostrar estadísticas de los enlaces:

`md-links archivo.md --validate --stats`

Al combinar las opciones --validate y --stats, md-links realizará una validación de los enlaces
 y, además, proporcionará estadísticas sobre los enlaces encontrados en el archivo archivo.md.

## 2. Estructura

El proyecto está estructurado de la siguiente manera:
```
DEV011-MD-LINKS/
├─── package.json
├─── package-lock.json
├─── README.md
├─── .gitignore
├─── src/
│   ├─── cli.js
│   ├─── functions.js
│   ├─── md-links.js
├─── test/
│   ├─── functions.spec.js
│   └─── md-links.spec.js
├─── testFiles/
│   ├─── archivo-2links.md
│   ├─── archivo-3links1error.md
│   ├─── archivo-noLinks.md
│   └─── prueba-txt.txt
```

## 3. Archivos principales

* `cli.js`: archivo de entrada de la aplicación. Se encarga de tomar argumentos de la línea
    de comandos y gestionar las opciones proporcionadas por el usuario.
* `functions.js`: contiene las funciones principales utilizadas para realizar 
    diferentes tareas en la aplicación, como la verificación de la existencia de archivos,
    la lectura de contenido de archivos, la extracción de enlaces y la validación de enlaces.
* `md-links.js`: Orquesta la funcionalidad principal de la herramienta md-links, utilizando 
    las funciones definidas en functions.js para realizar el análisis de enlaces en archivos Markdown.


## 4. Pruebas

Se han incluido pruebas para garantizar la funcionalidad correcta de la herramienta. Están ubicadas 
en la carpeta test y se utilizan para verificar las funciones implementadas en functions.js y md-links.js.

## 5. Dependencias

* **axios**: para realizar peticiones HTTP para validar enlaces.
* **jsdom**: para manipulación del DOM para extraer enlaces de archivos Markdown.
* **marked**: para analizar archivos Markdown y convertirlos a HTML.

## 6. Comando de prueba
Se usa Jest para ejecutar las pruebas y mostrará un informe de cobertura del código con el siguiente comando:
`npm test`
