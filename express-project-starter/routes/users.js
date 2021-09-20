var express = require('express');
const { csrfProtection } = require('./utils');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, function(req, res, next) {
  res.render('user-sign');
});

module.exports = router;
