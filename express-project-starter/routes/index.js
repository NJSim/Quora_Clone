var express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');

var router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const questions = await db.Question.findAll({
    include: [{ model: db.User }, { model: db.Answer }],
    order: [['createdAt', 'DESC']]
  });
  res.render('index', {
    title: 'Mora Home Page(edit later)',
    questions
  });
}));
router.get('/questions/:id(\\d+)',requireAuth,async(req,res,next)=>{
   const questionId = parseInt(req.params.id,10);
   const question = await db.Question.findByPk(questionId,{
     include:[
      {model:db.Answer,
      include: [db.Answers_vote]},
      {model:db.User},
      {model:db.Questions_vote}
    ]
   });
   res.render('question-detail',{
     title:'View Question',
     question
   })
})

router.post('/questions/:id(\\d+)/answers',requireAuth,async(req,res,next)=>{
  const {content} = req.body;
  await db.Answer.create({
    user_id: res.locals.user.id,
    question_id:req.params.id,
    content
  })
  res.redirect('/questions/'+`${req.params.id}`)
})




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
