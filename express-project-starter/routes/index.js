var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { requireAuth } = require('../auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get('/questions/new',requireAuth,csrfProtection, (req,res,next)=>{
  res.render('create-question', {token: req.csrfToken(),})
})

const questionValidator=[
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Title')
    .isLength({ max: 1000 })
    .withMessage('Title must not be more than 1000 characters long')
  ]

router.post('/questions', requireAuth, csrfProtection, questionValidator, asyncHandler(async(req,res)=>{
  const {title}=req.body;
  const validatorErrors = validationResult(req);
  
  if (validatorErrors.isEmpty()) {
    await db.Question.create({
      title, 
      user_id:res.locals.user.id
      
    })
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('create-question', {
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));
  
 
  





module.exports = router;
