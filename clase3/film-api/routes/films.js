var express = require('express');
const auth = require('../middlewares/auth');
const db = require('../middlewares/db');
const filmId = require('./params/film_id');

var router = express.Router();

router.use(auth);
router.use(db);
filmId(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  const films = req.db.get('films');
  res.render('films', {films});
});

router.get('/:film_id', function(req, res, next) {
  const film = req.film;
  res.render('film-detail', {film});
});

router.all('/add', function(req, res, next) {
  const film = req.body || {};
  const {name, description, image} =film
  if (!name || !description || !image ){
    res.render('film-add', { film });

  }else{
    req.db.add(film);
    res.redirect('/films')
  }
  console.log('hola')
});

module.exports = router;
