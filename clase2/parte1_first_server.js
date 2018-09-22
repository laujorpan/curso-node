const http = require('http');

//Create a server with its port config. By default, it works in localhost:8080
http.createServer(function(request, response){
    console.log('request!!');
    
    //Response: Redirect
    /*
    response.writeHead(301,{
        'Location':'http://www.google.es'
    })
    response.end()
    */
    
    //Response: Send a json message
    response.writeHead(200,{
        'Content-Type':'application/json'
    })
    response.end('{"message": "hello world"}')
}).listen(8080)