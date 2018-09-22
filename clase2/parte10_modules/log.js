//Module example
function detail(text){
    console.log(new Date, text);
}
function detailErr(text){
    console.error(new Date,'Error: ', text);
}
//Module definition
module.exports =  {
    detail,
    detailErr
}
