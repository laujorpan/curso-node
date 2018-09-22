const fs = require('fs')


//Same class5 example but using Promises

function readFile(name){
    return new Promise((resolve, reject) => {
        console.log('Start promise '+name)
        fs.readFile(name, (error, contenido) => {
          console.log('Empezando la lectura de ', name);
          if (error) {
            console.log('Error en la lectura');
            return reject(error);
          }
          console.log('Lectura finalizada en ', name);
          resolve(contenido);
        });
    })
}

function writeFile(file, content){
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, (error) => {
          if(error) {
                console.log('Error en la escritura de ', file);
                return reject(error);
            }
            console.log('Escritura Termianda en ', file);
            resolve();
        });
    });
}

readFile ('./copy-clase4.js').then((content) => {
    console.log('Leido, pasamos a escritura');
    return writeFile('copy2-clase4.js', content)
}).then(() =>{
    console.log('Finish');
}).catch(() => {
    console.log('Error')
})
