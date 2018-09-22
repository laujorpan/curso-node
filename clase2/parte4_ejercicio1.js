const http =require('http')
const url = require('url')

/*
 
 */

let error=false

http.createServer(function(request, response){
    let demoURL=request.url;
    const parsed1 = url.parse(request.url);
    
    response.writeHead(200, {
        'Content-Type':'text/html'
    })
    if(error){
        response.end('<h1>Error!!!</h1>')
    }

    if(parsed1.pathname==='/'){
        response.end('<h1>Bienvenido!!</h1>')
    }else if(parsed1.pathname==='/contact'){
        response.write('<h1>Contacto</h1>')
        response.write('<ul>')
        response.write('<li>Telefono:666 666 666</li>')
        response.write('<li>Direccion: Madrid</li>')
        response.write('</ul>')
        response.end();
    }else if(parsed1.pathname==='/bug'){
        error=true
    }

}).listen(8080)