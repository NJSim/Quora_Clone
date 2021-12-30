var express = require("express");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require("../auth");
const Sequelize = require("sequelize");
const images = [
  "https://i.imgur.com/hES7D98.jpeg",
  "https://images.unsplash.com/photo-1581390114939-946f9a890a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
  "https://www.gannett-cdn.com/presto/2021/01/07/USAT/0d87949b-7f95-4318-a7f7-72f2b6893d05-marvel-shows.png",
  "https://i.imgur.com/JBxmIGv.jpeg",
  "https://images.unsplash.com/photo-1503160865267-af4660ce7bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1598386651573-9232cc0c2f7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "https://fdn.gsmarena.com/imgroot/news/20/10/netflix-india-free-weekend/-1200/gsmarena_001.jpg",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80",
  "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  "http://ielanguages.com/blog/wp-content/uploads/2015/10/loimp.jpeg?x26507",
  "https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2017/09/160821-CINEMA-LATINO-KEVINJBEATY-05.gif",
  "https://image.cnbcfm.com/api/v1/image/102129219-544fe3109623b.jpg?v=1497046818&w=1600&h=900",
];
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

var router = express.Router();

const questionValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for question")
    .isLength({ max: 1000 })
    .withMessage("User Name must not be more than 50 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { user_name: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided user name is already in use by another account"
          );
        }
      });
    }),
];

/////GET HOME PAGE/////
router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const spaceObjects = await db.Space.findAll();
    const spaceSet = new Set();
    for (const space of spaceObjects) {
      spaceSet.add(space.dataValues.tag);
    }
    const spaces = [...spaceSet];
    const questions = await db.Question.findAll({
      include: [
        db.Questions_vote,
        db.Answer,
        db.Space,
        db.User,
        {
          model: db.Answer,
          include: [db.User, db.Answers_vote],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    for (let question of questions) {
      question.date = question.updatedAt.toLocaleDateString("en-US", options);
    }
    const data = [];
    for (let question of questions) {
      const answers = await db.Answer.findAll({
        where: { question_id: question.id },
        include: [{ model: db.User }, { model: db.Answers_vote }],
        order: [["createdAt", "DESC"]],
      });
      if (answers) {
        for (let answer of answers) {
          answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
        }
      }

      const likes = await db.Questions_vote.findAll({
        where: {question_id: question.id}
      });

      data.push({ question: question, answers: answers, likes:likes });
    }
    res.render("index", {
      title: "Mora Home",
      data,
      spaces,
      images,
      token: req.csrfToken(),
    });
  })
);
//////GET QUESTIONS IN SPACE//////
router.get(
  "/questions-in-space/:space",
  csrfProtection,
  async (req, res, next) => {
    const spaceObjs = await db.Space.findAll();
    const spaces = [];
    for (const s of spaceObjs) {
      spaces.push(s.tag);
    }

    let space = req.params.space;

    let data = [];
    const questionspaces = await db.Question.findAll({
      include: [
        {
          model: db.Space,
          where: { tag: space },
        },
      ],
    });
    for (const questionspace of questionspaces) {
      const question = await db.Question.findByPk(questionspace.id, {
        include: [
          { model: db.User },
          { model: db.Questions_vote },
          {
            model: db.Answer,
            include: [db.User, db.Answers_vote],
          },
          {
            model: db.Space,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      question.date = question.updatedAt.toLocaleDateString("en-US", options);
      if (question.Answers) {
        for (let answer of question.Answers) {
          answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
        }
      }
      const likes = await db.Questions_vote.findAll({
        where: {question_id: question.id}
      });
      data.push({ question: question, answers: question.Answers, likes:likes });
    }
    res.render("index", {
      title: `All Questions in ${space}`,
      data,
      spaces,
      images,
      token: req.csrfToken(),
    });
  }
);
//////GET INDIVIDUAL QUESTION/////
router.get(
  "/questions/:id(\\d+)",
  requireAuth,
  csrfProtection,
  async (req, res, next) => {
    const spaceObjects = await db.Space.findAll();
    const spaces = [];
    for (const space of spaceObjects) {
      spaces.push(space.dataValues.tag);
    }
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId, {
      include: [{ model: db.User }, { model: db.Space },{ model: db.Questions_vote }],
    });
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    question.date = question.updatedAt.toLocaleDateString("en-US", options);
    const newSpaces = [...spaces];
    if (question.Spaces) {
      for (const s of question.Spaces) {
        const spaceIdx = newSpaces.indexOf(s.tag);
        newSpaces.splice(spaceIdx, 1);
      }
    }
    question.newSpaces = newSpaces;
    const answers = await db.Answer.findAll({
      where: { question_id: questionId },
      include: [{ model: db.User }, { model: db.Answers_vote }],
      order: [["createdAt", "DESC"]],
    });
    for (let answer of answers) {
      answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
    }
    const likes = await db.Questions_vote.findAll({
      where: {question_id: question.id}
    });
    res.render("question-detail", {
      title: "View Question",
      question,
      answers,
      spaces,
      images,
      likes,
      token: req.csrfToken(),
    });
  }
);

/////POST ANSWER TO QUESTION/////
router.post(
  "/questions/:id(\\d+)/answers",
  requireAuth,
  async (req, res, next) => {
    const { content } = req.body;
    await db.Answer.create({
      user_id: res.locals.user.id,
      question_id: req.params.id,
      content,
    });
    res.redirect("/questions/" + `${req.params.id}`);
  }
);

/////GET NEW QUESTION FORM PAGE/////
router.get("/questions/new", requireAuth, csrfProtection, (req, res, next) => {
  res.render("create-question", { token: req.csrfToken() });
});

/////POST NEW QUESTION/////
const questionValidator = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Title")
    .isLength({ max: 1000 })
    .withMessage("Title must not be more than 1000 characters long"),
];

router.post(
  "/questions",
  requireAuth,
  csrfProtection,
  questionValidator,
  asyncHandler(async (req, res) => {
    const { title } = req.body;
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await db.Question.create({
        title,
        user_id: res.locals.user.id,
      });
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("create-question", {
        errors,
        token: req.csrfToken(),
      });
    }
  })
);

/////POST NEW QUESTIONSPACE/////
router.post(
  "/questions/:id(\\d+)/questionSpaces",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const spaceObjects = await db.Space.findAll();
    const spaces = [];
    for (const space of spaceObjects) {
      spaces.push(space.dataValues.tag);
    }
    const {
      Actors_and_Actresses,
      Hollywood,
      Marvel_Cinematic_Universe,
      Movie_Lists,
      Bollywood,
      Acting,
      Netflix_Lists_Hot,
      Oscar_Winners,
      Movie_Reviews,
      Spanish_Soap_Opra,
      Latino_Movies,
      Black_Leading_Actors,
    } = req.body;
    const spacesForm = [
      Actors_and_Actresses,
      Hollywood,
      Marvel_Cinematic_Universe,
      Movie_Lists,
      Bollywood,
      Acting,
      Netflix_Lists_Hot,
      Oscar_Winners,
      Movie_Reviews,
      Spanish_Soap_Opra,
      Latino_Movies,
      Black_Leading_Actors,
    ];
    console.log("$$$$$$$$$$$$$$$",spacesForm)
    for (let i=0;i<spacesForm.length;i++) {
      const questionSpace = await db.Questionspace.findOne({
        where: {
          question_id: questionId,
          space_id: i + 1,
        },
      });
      if (spacesForm[i] && !questionSpace) {
          await db.Questionspace.create({
            space_id: i + 1,
            question_id: questionId,
          });
      }
      else if(!spacesForm[i] && questionSpace){
          await questionSpace.destroy();
      }
    }

    res.redirect("/my-questions");
  })
);

/////GET MY QUESTIONS PAGE/////
router.get(
  "/my-questions",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const spaceObjects = await db.Space.findAll();
    const spaces = [];
    for (const space of spaceObjects) {
      spaces.push(space.dataValues.tag);
    }
    const myQuestions = await db.Question.findAll({
      where: { user_id: res.locals.user.id },
      include: [
        db.Questions_vote,
        db.Space,
        db.User,
        {
          model: db.Answer,
          include: [db.User, db.Answers_vote],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    for (let question of myQuestions) {
      const newSpaces = [...spaces];
      if (question.Spaces) {
        for (const s of question.Spaces) {
          const spaceIdx = newSpaces.indexOf(s.tag);
          newSpaces.splice(spaceIdx, 1);
        }
      }
      question.newSpaces = newSpaces;
      question.date = question.updatedAt.toLocaleDateString("en-US", options);
      const answers = question.Answers;
      if (answers) {
        for (let answer of answers) {
          answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
        }
      }
      const likes = await db.Questions_vote.findAll({
        where: {question_id: question.id}
      });
      question.likes = likes;
    }


    res.render("my-questions", {
      title: "My Questions",
      myQuestions,
      spaces,
      images,
      token: req.csrfToken(),
    });
  })
);

/////GET MY ANSWERS PAGE/////
router.get(
  "/my-answers",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const spaceObjects = await db.Space.findAll();
    const spaces = [];
    for (const space of spaceObjects) {
      spaces.push(space.dataValues.tag);
    }
    const myAnswers = await db.Answer.findAll({
      where: { user_id: res.locals.user.id },
      include: [
        db.User,
        db.Answers_vote,
        {
          model: db.Question,
          include: [db.User, db.Space, db.Questions_vote],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    for (let answer of myAnswers) {
      answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
      const question = answer.Question;
      const likes = await db.Questions_vote.findAll({
        where: {question_id: question.id}
      });
      question.likes = likes;
      question.date = question.updatedAt.toLocaleDateString("en-US", options);
    }


    res.render("my-answers", {
      title: "My Answers",
      myAnswers,
      spaces,
      images,
      token: req.csrfToken(),
    });
  })
);

/////GET OUR STORY PAGE/////
router.get("/our-story", async (req, res, next) => {
  const spaceObjects = await db.Space.findAll();
  const spaces = [];
  for (const space of spaceObjects) {
    spaces.push(space.dataValues.tag);
  }
  res.render("our-story", {
    title: "Our Story",
    spaces,
    images,
  });
});

/////QUESTION VOTE/////
router.get(
  "/questions/:id(\\d+)/votes",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const questionId = parseInt(req.params.id, 10);
    const userId = res.locals.user.id;

    const alreadyVoted = await db.Questions_vote.findOne({
      where: { user_id: userId, question_id: questionId },
    });

    if (alreadyVoted) {
      await alreadyVoted.destroy();
    } else {
      const upvote = db.Questions_vote.build({
        user_id: userId,
        question_id: questionId,
      });
      await upvote.save();
    }

    const voteArray = await db.Questions_vote.findAll({
      where: { question_id: questionId },
    });

    res.json({ voteArray });
  })
);

/////ANSWER VOTE/////
router.get(
  "/answers/UQ/:id(\\d+)/votes",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const answerId = parseInt(req.params.id, 10);
    const userId = res.locals.user.id;

    const alreadyVoted = await db.Answers_vote.findOne({
      where: { user_id: userId, answer_id: answerId },
    });

    if (alreadyVoted) {
      await alreadyVoted.destroy();
    } else {
      const upvote = db.Answers_vote.build({
        user_id: userId,
        answer_id: answerId,
      });
      await upvote.save();
    }

    const voteArray = await db.Answers_vote.findAll({
      where: { answer_id: answerId },
    });

    res.json({ voteArray });
  })
);

/////SEARCH QUESTIONS/////
router.post(
  "/search-question",
  asyncHandler(async (req, res) => {
    const { title } = req.body;
    const questions = await db.Question.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: "%" + title + "%",
        },
      },
    });
    res.send(questions);
  })
);

/////DELETE ANSWER/////
router.delete("/answers/:id(\\d+)", async (req, res) => {
  const id = req.params.id;
  // const answerVotes = await db.Answers_vote.findAll({
  //   where:{answer_id:id}
  // })
  // for( answerVote of answerVotes){
  //   await answerVote.destroy();
  // }
  const answer = await db.Answer.findByPk(id);
  await answer.destroy();
  res.status = 200;
  res.send();
});

/////DELETE QUESTION/////
router.delete(
  "/questions/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const questionId = parseInt(req.params.id, 10);
    const questionToDelete = await db.Question.findByPk(questionId);
    await questionToDelete.destroy();
  })
);

router.post(
  "/answers/:id(\\d+)",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { content } = req.body;
    const answer = await db.Answer.findByPk(req.params.id);
    answer.content = content;
    await answer.save();
    res.redirect("/my-answers");
  })
);

router.post(
  "/questions/:id(\\d+)",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { title } = req.body;
    const question = await db.Question.findByPk(req.params.id);
    question.title = title;
    await question.save();
    res.redirect(`/questions/${req.params.id}`);
  })
);
module.exports = router;
