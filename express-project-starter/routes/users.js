var express = require('express');

const { csrfProtection } = require('./utils');
const db = require('../db/models');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, function(req, res, next) {
  const user = db.User.build();
  res.render('user-signup', {
    title: 'Signup',
    user,
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;
