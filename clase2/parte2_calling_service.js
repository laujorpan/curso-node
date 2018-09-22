const http =require('http')

//Calling a service (with callbacks)
function ping(host){
    http.get(host, (response) => {
        console.log('OK Code:'+response.statusCode);
        
    }).on('error', () => {
        console.log('KO')
    }
    )
}

ping('http://ghibliapi.herokuapp.com/films/')