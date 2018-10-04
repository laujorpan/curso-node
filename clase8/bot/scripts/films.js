const formatter = require('../lib/formatter')
const request = require ('request-promise-native')
module.exports=function(robot) {
    //variable para saber si estamos en consola, en slack...
    const adapter = robot.adapterName;
    //Formateador que nos de mensajes personalizados segun adapter
    const format = formatter(adapter);
    robot.respond(/listado de pel[ií]culas/, function (res){
        /* Con promesas (request-promise-native)*/
        request('https://ghibliapi.herokuapp.com/films').then((data)=>{
            const films= JSON.parse(data);
            res.send(format.formatFilms(films))
        })
        /* Modo "Normal"
        robot.http('https://ghibliapi.herokuapp.com/films')
        .header('Content-Type','application/json')
        .get()(function(err,response,body){
            //No llamar a response igual que el de la linea robot.respond porque lo pisamos
            const films=JSON.parse(body)
            res.send(format.formatFilms(films))
        })
        */
    })
    robot.respond(/dime las ([úu]ltimas|primeras) (\d+) pel[íi]culas/i, (res)=>{
        const order=res.match[1];
        const quantity=res.match[2];
        request('https://ghibliapi.herokuapp.com/films').then((data)=>{
            const films= JSON.parse(data);
            let orderedFilms=films.sort(function compareFilmDate(a,b) {
                if (a.release_date - b.release_date)
                  return -1;
                if (a.release_date > b.release_date)
                  return 1;
                return 0;
              })
            if(order==='primeras'){
                orderedFilms=orderedFilms.reverse()
            }
            orderedFilms=orderedFilms.slice(0,quantity);
            res.send(format.formatNotAllFilms(orderedFilms))
        })
    })
    

}