const express = require('express');
const router = express.Router();
const initHashtag = require ('../lib/twitter-stream')

//Call initHashtag func to see only running our server if it works
//initHashtag('foto');

router.get('/', (req, res) => {
    res.render('map', {
        MAPS_API: process.env.MAPS_API,
        title: 'Twitter Stream',
        error: req.query.error,
        logout: !!req.query.logout
    });
});

module.exports = router;
