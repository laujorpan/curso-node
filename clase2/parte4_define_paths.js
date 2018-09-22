const http =require('http')
const url = require('url')

//Create a server and diferent actions depending on path
http.createServer(function(request, response){
    let demoURL=request.url;
    const parsed1 = url.parse(request.url);
    
    response.writeHead(200, {
        'Content-Type':'text/html'
    })
    
    if(parsed1.pathname==='/pintar'){
        response.end('<h1>Pintado!!</h1>')
    }else if(parsed1.pathname==='/contact'){
        response.write('<h1>Contacto</h1>')
        response.write('<h3>tel: 666 666 666</h3>')
        response.end();
    }else{
        console.log('El host: ' + url.parse(demoURL).hostname);
        console.log('El puerto: ' + url.parse(demoURL).port);
        console.log('La ruta: ' + url.parse(demoURL).pathname);
        console.log('La parametro: ');
        /*
        url.parse(demoURL,true).query.forEach(element => {
            console.log(element);
        });
        */
        console.log('El hash(#): ' + url.parse(demoURL).hash);
        response.end();
    }

}).listen(8080)