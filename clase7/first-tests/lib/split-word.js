module.exports=function(str){
    if(!str){
        throw new Error('An argument is required')
    }
    //return str.split(' '); Para probar asincronía vamos a retornar una promesa
    return new Promise((resolve,reject)=>{
       setTimeout(()=>resolve(str.split(' ')),100)
    })
}