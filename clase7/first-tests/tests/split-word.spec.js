//Inyectar chai const chai = require('chai');
const {assert,expect}= require('chai');
//Mocha se inyecta solo
const splitWord=require('../lib/split-word'); //Para poder usar la funcion que quiero testear


//Para poder tirar de las funciones de timeout y demas necesitamos no usar arrow functions porque si las usamos al hacer this.timeout(...) el contexto (this) no existe
describe('in/out', function(){
    /* 
    
    Este se podria quitar porque lo cubre el siguiente
    
    it('returns an array', function(){
        //preparacion: variables necesarias
        const input = 'hello world';
        //ejecucion: lanzar el metodo a probar
        const out =splitWord(input);
        //resultado: los asserts
        expect(out).to.be.an('array')
    })
    */
    it('returns an array of words', function(){
        //preparacion
        const input = 'hello world';
        const output = ['hello','world'];
        //ejecucion
        const out =splitWord(input);
        //resultado
        expect(out).to.be.deep.equal(output)
    })

    it('throws exception if no args', function(){
        //ejecucion y resultado: los asserts
        expect(()=>{
            splitWord()
        }).to.throw('An argument is required');
        //Otro modo: expect(splitWord).to.throw('An argument is required');
    })
    //Probando asincronia con promesas (los anteriores fallaran)
    it('returns after 2s', function(){
        //preparacion
        this.timeout('200')
        const input = 'hello world';
        const output = ['hello','world'];
        //ejecucion y resultado: los asserts
        return splitWord(input).then((words)=>{
            expect(words).to.be.deep.equal(output);
            
        });
        
    })
    /*
    Probando asincronia con "estilo node". Hay que cambiar la funcion para que reciba un callback (los anteriores a la asincronia fallaran)
    it('returns after 2s without promises', function(done){
        //preparacion
        this.timeout('200')
        const input = 'hello world';
        const output = ['hello','world'];
        //ejecucion y resultado: los asserts
        splitWord(input,(words)=>{
            expect(words).to.be.deep.equal(output);
            done();
        });
    })
    */
})

//Para cobertura: istanbul, blanket (en desuso) y ahora en la ultima versión de node hay cobertura nativa
//Cobertura + lanzar test: Jest