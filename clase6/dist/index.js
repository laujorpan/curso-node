const {Readable, Writable} =require('stream')

//Creacion de un stream "readable"
//Basicamente es un emisor
const readStream = Readable ({
    read() {
        if(!this.charNum){
            this.charNum = 65; // letra a
        }
        const char = String.fromCharCode(this.charNum);

        this.push(char) //emite el caracter

        if (this.charNum>90){
            this.push(null); //esto hara que finalice la lectura
        }
        this.charNum++
    }
})

//Creacion de un stream "readable"
//Basicamente es un receptor, va recibiendo trocitos "chunks"
// y tiene un callback que da paso a que continue el siguiente "chunk"
const writeStream = Writable ({
    write(chunk, encoding,callback) {
        //console.log(chunk); //Esto tal cual pinta <Buffer XX> porque es la manera en la que se reciben los datos en el stream.
        console.log(chunk.toString()); //Esto pinta la letra como tal que he recibido
        callback();
    }
})

readStream.pipe(writeStream)