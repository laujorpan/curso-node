#!/usr/bin/env node
const http = require('http')
const cluster = require('cluster');
const cpus = require('os').cpus().length;

//Creating a cluster
if(cluster.isMaster){
    for (let i = 0; i < cpus; i++) {
        cluster.fork() //realunch this script
    }
}else{
    http.createServer(function(request, response){
    
        response.end('Proceso con PID ' + process.pid ) //print its process id
    
    }).listen(8080)
}
