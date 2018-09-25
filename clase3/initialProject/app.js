var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//--------------------------------------------------------------------------------------------
//Mi primer MIDDLEWARE
app.use((req,res,next) => {
  //res.redirect('/') //En este caso todo lo que entre en la app se redirige
  next(); //En este caso entra la petición y con el next se 'envia' a quien la controle
});
//Mi primera RUTA
app.route('/test').get((req,res) => {
  res.render('index',{title:'Ya estoy'})
})

//Trabajo con MIDDLEWARES
middleware = (req,res,next) => {
  console.log('middleware');
  next(); 
};
//Una ruta con middlewares
app.get('/testMiddleware', [middleware,middleware,middleware] ,(req,res) => {
  //podría llevar el next como los middlewares pero sera undefined
  res.render('index',{title:'Ya estoy tras los middleware'})
})

//Un parametro (es un middleware pero 'especial')
app.param('id',(req,res,next,id) => { 
  res.id=id;
  next();
})
//Ruta con parametros
app.route('/test/:id').get((req,res) => {
  res.render('index',{title:'Ya estoy. Yo soy :'+res.id})
})


//--------------------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
