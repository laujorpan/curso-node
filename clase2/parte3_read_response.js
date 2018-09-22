const http =require('http')

//Calling a sevice (with promises)
function getJSON(host){
    return new Promise((resolve,reject) => {
        http.get(host, (response) => {
            let data = '';
            response.on('data',(chunk) => {
                data+=chunk;
            }).on('end',() => {
                const json = JSON.parse(data)
                resolve(json)
            });
        }).on('error', () => {
            reject('Error!!!');
        });
    });
}

getJSON('http://ghibliapi.herokuapp.com/films/').then((json)=>{
    json.forEach(element => {
        console.log(element);
    });
})