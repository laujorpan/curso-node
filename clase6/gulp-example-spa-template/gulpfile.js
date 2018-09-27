// Load plugins
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const browserify = require("browserify"); //Resolver import
const babelify = require("babelify"); //Babel pero trabajando con streams. Es para "convertir el codigo a que sirva para antiguo"
const source = require('vinyl-source-stream') //Para trabajar con el stream de node que es un buffer y pasarlo a lo que queramos
const buffer = require('vinyl-buffer') //Para trabajar con el stream de node que es un buffer y pasarlo a lo que queramos
const sass = require('gulp-sass');
const runTask = require('run-sequence');
const connect = require('gulp-connect');//arrancar servidor web
const open = require('open');//abrir navegador desde node

//Undecima ((extra))open('http://localhost:8080')

//Decima ((extra))
gulp.task('run-server', function(){
  return connect.server({
    root: 'dist',
    livereload:true //abre un socket para que la pagina se recargue cuando queramos
  })
})

// Lint javascript
gulp.task('lint', () => {
  // Segunda
  return gulp.src(['src/**/*.js','gulpfile.js'])
  .pipe(eslint()) //para pasarle el lint
  .pipe(eslint.format()) //para pintar en consola
  .pipe(eslint.failAfterError()); //para que el proceso de error si hay errores

});

// Public assets
gulp.task('public', () => {
  // Primera 
  return gulp.src('public/*').pipe(gulp.dest('dist/'))
});

// Styles
gulp.task('styles', () => {
  // Septima
  //NOTA: solo pongo 'src/styles/*.scss' porque dentro se importan los otros
  return gulp.src('src/styles/*.scss').pipe(sass()).pipe(rename({
    basename: 'app'
  })).pipe(gulp.dest('dist/styles'))
});

// Vendor
gulp.task('vendor', () => {
  // Quinta
  return gulp.src('node_modules/requirejs/require.js').pipe(rename({
    basename: "vendor",
    extname: ".js"
  })).pipe(gulp.dest('dist/scripts/'))
});

// Scripts
gulp.task('scripts', ['lint'], () => {
  // Sexta: ver en https://github.com/gulpjs/gulp/tree/master/docs/recipes#recipes
  //Si el plugin fuera de gulp empezariamos: gulp.src('src/**/*.js')
  
  //PASO 1: Resolver import
  return browserify({
    entries:'src/index.js', //fichero de entrada de la aplicacion
    extensions:['.js'], //extensiones
    path:['src','node_modules'], //donde estan tanto los js a transformar como las librerias
    debug:true
  })
  //PASO 2: el stream de browserify permite funcion transform. Lo que vamos a hacer es transformar a codigo compatible
  .transform(babelify,{
    presets:[
      'env',//lo convierte a antes de ECMAScript6
      'react'//Porque lo que va a leer es codigo react
    ]
  })
  //PASO 3: bundle realmente ejecuta
  .bundle()
  //PASO 4: convertir a stream de node y unificar en un fichero
  .pipe(source('app.js'))
  //PASO 5: convertir a stream gulp
  .pipe(buffer())
  //PASO6: como ya es de gulp lo puedo guardar como hasta ahora
  .pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', () => {
  // Tercera
  const processImage=imagemin({
    optimizationLevel: 3,
    progressive:true
  });
  
  return gulp.src(['src/images/**/*']).pipe(cache(processImage)).pipe(gulp.dest('dist/images/'))
});

// Clean
gulp.task('clean', () => {
  // Cuarta
  return gulp.src('dist/', {read:false})
        .pipe(clean({force: true}));
});

// Build App
// Octava: esto da un error porque ñlanza todo en paralelo y hay un punto que falla porque se ejecuta el clean. Para hacerlo en secuencia hace falta run-sequence
//gulp.task('build', ['clean','images','styles','scripts','vendor','public'], (callback) => {
//});
gulp.task('build',  (callback) => {
  runTask(
    'clean',//esta será la primera
    ['images','public','styles'], //esto va en paralelo lo segundo
    'vendor',//tercera tarea cuando acaben las 3 anteriores
    'scripts',//cuarta
    callback //para decirle que hemos acabado
  )
});


// Default task
gulp.task('default', ['build']);

// Watch
gulp.task('server', ['build'], () => {
  gulp.run('run-server')
  //((extra))
  open('http://localhost:8080')
  // Novena : podriamos poner que lanzara la tarea concreta que afecta a ese tipo de fichero
  gulp.watch('/src/**/*.scss',function(){
    
    gulp.run('styles')
    .pipe(connect.reload());//para recargar la pagina, esto es porque hemos puesto livereload
  });
  gulp.watch('/src/**/*.js',['build']);
  gulp.watch('/public/**/*',['build']);
  gulp.watch('/src/images/**/*',['build']);
});


