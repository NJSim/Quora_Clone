var express = require('express');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

var router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const questions = await db.Question.findAll({
    include: [{ model: db.User }, { model: db.Answer }],
    order: [['createdAt', 'ASC']] 
  });
  res.render('index', {
    title: 'Mora Home Page(edit later)', 
    questions
  });
}));

module.exports = router;
