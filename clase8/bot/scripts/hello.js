const formatter = require('../lib/formatter')

module.exports = function(robot){
    //variable para saber si estamos en consola, en slack...
    const adapter = robot.adapterName;
    //Formateador que nos de mensajes personalizados segun adapter
    const format = formatter(adapter);

    robot.hear(/hola/i, function (res) {
        res.send(format.sayHello())
    });
    robot.hear(/buenas/i, function (res) {
        const date=new Date();
        const hour = date.getHours()
        if (hour>7 && hour<12){
            res.send('Buenos días');
        }else if (hour<19 && hour>12){
            res.send('Buenos días');
        }else {
            res.send('Buenas noches');
        }
    });
    //respuestas para cuando le mencionemos como @my-class-bot que es como se llama
    robot.respond(/adi[oó]s/i,function (res) {
        res.send('Venga adiós!!')
    });
    //Con () capturamos el valor, con [0-5] forzamos a que ese valor sea de 0 a 5
    const films = ['Venom', 'Ola de crimenes','Jonny English','La monja', 'El reino']
    robot.respond(/dime ([0-5]) pel[ií]culas/i,function (res) {
        const numFilms=res.match[1];
        const myFilms=films.slice(0,numFilms);
        res.reply('Films: '+myFilms.join(','));
    });

}