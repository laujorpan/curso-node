var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//--------------------------------------------------------------------------------------------
router.get('/film', function(req, res, next) {
  res.render('index', { title: 'Film' });
});
router.get('/authors', function(req, res, next) {
  res.render('index', { title: 'Authors' });
});

module.exports = router;
