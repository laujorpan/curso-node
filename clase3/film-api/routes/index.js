var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const query = req.query

  let message='';
  if(query.error){
    message='Invalid credentials'
  }

  res.render('index', { message });
});

router.post('/login', function(req, res, next) {
  const body = req.body;
  const {email, pwd, remember} = body

  if (email === 'lau@lau.com' && pwd==='lau'){
    req.session.user = { email }
    res.redirect('/films');
  }else{
    res.redirect('/?error=true') //el parametro que hemos definido en el retorno es de 'tipo query' no es de los definidos con :name (que seria lo que se entiende por parametro)
  }
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/')
});
module.exports = router;
