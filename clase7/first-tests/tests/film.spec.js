const {assert,expect}= require('chai');
const getFilm=require('../lib/film'); 
const sinon=require('sinon'); 



describe('in/out', function(){
   //El only hace que solo se pasen los test indicados con esa marca
    it.only('Error if no id', function(){
        expect(()=>{
            getFilm()
        }).to.throw('ID not exists');
    })
    //Comprobamos con un espia que cuando llegamos a llamar al adapter se ha montado bien la url
    it.only('Execution', function(){
        //preparacion
        const id='foo'
        const validUrl=`https://ghibliapi.herokuapp.com/films/${id}`;
        const adapter=sinon.stub().returns(Promise.resolve({title:id})) // Si no retorna una promesa resuelta el test no va a ir

        //ejecucion
        const result=getFilm(id,adapter);
        /*
        return getFilm(id,adapter).then((title) =>{
            expect(title).to.be.equal(id)
        }
        */
        //resultado
        expect(adapter.calledOnce).to.be.ok
        //Primera llamada a la funcion "espiada": adapter.getCall(0)
        //Primer arg pasado a la funcion "espiada": adapter.getCall(0).args[0]
        expect(adapter.getCall(0).args[0]).to.be.equal(validUrl)

    })

    
})