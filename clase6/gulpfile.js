const gulp = require('gulp')

/* Tarea que copia un fichero. Se lanza simplemente con el comando gulp en en directorio*/

gulp.task('default', () => {
    console.log('Estás en la tarea por defecto!')
    return gulp.src('index.js').pipe(gulp.dest('dist/'))//el return es para que espere a que haya devuelto los ficheros
});

/* Tarea que se lanza con el comando gulp test*/

gulp.task('test', () => {
    console.log('Estás en la tarea test!')
});

/* OTROS EJEMPLOS */

/* Una tarea que no se hace hasta que estan las otras */
/*
gulp.task('default', ['tarea1','tarea2'], () => {
    console.log('Estás en la tarea por defecto!');
});
gulp.task('tarea1', () => {
    console.log('Estás en la tarea 1!')
    console.log('Fin1!')
    
});
gulp.task('tarea2', () => {
    console.log('Estás en la tarea 2!')
    console.log('Fin2!')
});
*/

/* Dejar un escuhador que salte cuando cambie un fichero*/
/*
gulp.task('default', () => {
    gulp.watch('index.js',['log']); // otra forma de hacerlo es  gulp.watch('index.js',()=>{gulp.run('tarea')})) pero esta deprecado
});

gulp.task('log', () => {
    console.log('Cambiaste index.js')
});
*/
