var express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { requireAuth } = require('../auth');
const Sequelize = require('sequelize');
var router = express.Router();

/////GET HOME PAGE/////
router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const questions = await db.Question.findAll({
    include: [db.Questions_vote,db.User,
      {
      model: db.Answer,
      include: [
        db.User, db.Answers_vote
      ]
    }],
    order: [['createdAt', 'DESC']]
  });

  res.render('index', {
    title: 'Mora Home Page(edit later)',
    questions,
    token: req.csrfToken(),
  });
}));

//////GET INDIVIDUAL QUESTION/////
router.get('/questions/:id(\\d+)',requireAuth,async(req,res,next)=>{
  const questionId = parseInt(req.params.id,10);
  const question = await db.Question.findByPk(questionId,{
    include:[
      {model:db.User},
      {model:db.Questions_vote},
    ],
  });

  const answers = await db.Answer.findAll({
    where: {question_id:questionId},
    include:[
      {model:db.User},
      {model:db.Answers_vote},
    ],
    order: [['createdAt', 'DESC']]
  })
   //console.log(question.json())
  res.render('question-detail',{
    title:'View Question',
    question,
    answers
  })
})

/////POST ANSWER TO QUESTION/////
router.post('/questions/:id(\\d+)/answers',requireAuth,async(req,res,next)=>{
  const {content} = req.body;
  await db.Answer.create({
    user_id: res.locals.user.id,
    question_id:req.params.id,
    content
  })
  res.redirect('/questions/'+`${req.params.id}`)
})

/////GET NEW QUESTION FORM PAGE/////
router.get('/questions/new',requireAuth,csrfProtection, (req,res,next)=>{
  res.render('create-question', {token: req.csrfToken(),})
});

/////POST NEW QUESTION/////
const questionValidator = [
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

/////GET MY QUESTIONS PAGE/////
router.get('/my-questions', requireAuth, asyncHandler(async(req, res, next) => {
  const myQuestions = await db.Question.findAll({
    where: { user_id: res.locals.user.id },
    include: [db.Questions_vote, db.User,
      {
      model: db.Answer,
      include: [db.User, db.Answers_vote]
    }],
    order: [['createdAt', 'DESC']]
  });
  res.render('my-questions', {
    title: 'My Questions',
    myQuestions
  })
}));

/////GET MY ANSWERS PAGE/////
router.get('/my-answers', requireAuth, asyncHandler(async(req, res, next) => {
  const myAnswers = await db.Answer.findAll({
    where: { user_id: res.locals.user.id },
    include: [db.User, db.Answers_vote, {
      model: db.Question,
      include: [db.User, db.Questions_vote]
    }],
    order: [['createdAt', 'DESC']]
  });

  res.render('my-answers', {
    title: 'My Answers',
    myAnswers,
  })
}));

/////GET OUR STORY PAGE/////
router.get('/our-story', asyncHandler(async(req, res, next) => {
  res.render('our-story', {
    title: 'Our Story',
  })
}));

/////QUESTION VOTE/////
router.get('/questions/:id(\\d+)/votes', requireAuth, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id,10);
  const userId = res.locals.user.id;

  const alreadyVoted = await db.Questions_vote.findOne({
    where : {user_id: userId, question_id: questionId}
  });

  if (alreadyVoted) {
    await alreadyVoted.destroy()
  } else {
    const upvote = db.Questions_vote.build({
      user_id: userId,
      question_id: questionId
    });
    await upvote.save();
  }

  const voteArray = await db.Questions_vote.findAll({
    where: { question_id: questionId}
  });

  res.json({voteArray});
}));

/////ANSWER VOTE/////
router.get('/answers/:id(\\d+)/votes', requireAuth, asyncHandler(async (req, res, next) => {
  const answerId = parseInt(req.params.id,10);
  const userId = res.locals.user.id;

  const alreadyVoted = await db.Answers_vote.findOne({
    where : {user_id: userId, answer_id: answerId}
  });

  if (alreadyVoted) {
    await alreadyVoted.destroy()
  } else {
    const upvote = db.Answers_vote.build({
      user_id: userId,
      answer_id: answerId
    });
    await upvote.save();
  }

  const voteArray = await db.Answers_vote.findAll({
    where: { answer_id: answerId}
  });

  res.json({voteArray});
}));

/////SEARCH QUESTIONS/////
router.post('/search-question', asyncHandler(async (req, res) => {
  const {title} = req.body;
  const questions = await db.Question.findAll({
    where:{
      title:{
        [Sequelize.Op.iLike]: '%' + title + '%'
      }}
  })
  res.send(questions)
}))

/////DELETE ANSWER/////
router.delete('/answers/:id(\\d+)', async(req,res)=>{
    const id = req.params.id;
    // const answerVotes = await db.Answers_vote.findAll({
    //   where:{answer_id:id}
    // })
    // for( answerVote of answerVotes){
    //   await answerVote.destroy();
    // }
    const answer = await db.Answer.findByPk(id);
    await answer.destroy();
    res.status = 200
    res.send();
})

/////DELETE QUESTION/////
router.delete('/questions/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id, 10);
  const questionToDelete = await db.Question.findByPk(questionId);
  await questionToDelete.destroy();
}));

module.exports = router;
