var express = require("express");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require("../auth");
const Sequelize = require("sequelize");

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

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
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
      data.push({ question: question, answers: answers });
    }
    console.log("answers!!!!!!", data);
    res.render("index", {
      title: "Mora Home",
      data,
      spaces,
      token: req.csrfToken(),
    });
  })
);
//////GET QUESTIONS IN SPACE//////
router.get(
  "/questions-in-space/:space",
  requireAuth,
  csrfProtection,
  async (req, res, next) => {
    let spaceObjects = await db.Space.findAll();
    let spaceSet = new Set();
    for (const space of spaceObjects) {
      spaceSet.add(space.dataValues.tag);
    }
    const spaces = [...spaceSet];
    let space = req.params.space;

    spaceObjects = await db.Space.findAll({
      where: {
        tag: space,
      },
    });
    let questions = [];
    for (const s of spaceObjects) {
      question = await db.Question.findByPk(s.question_id,{
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
      questions.push(question)
    }
    console.log(questions,"&&&&&&&&&&&&&&&&")
    res.render("my-questions", {
      title: `All Questions in ${space}`,
      myQuestions: questions,
      spaces,
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
    const spaceSet = new Set();
    for (const space of spaceObjects) {
      spaceSet.add(space.dataValues.tag);
    }
    const spaces = [...spaceSet];
    const questionId = parseInt(req.params.id, 10);
    const question = await db.Question.findByPk(questionId, {
      include: [{ model: db.User }, { model: db.Questions_vote }],
    });
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    question.date = question.updatedAt.toLocaleDateString("en-US", options);

    const answers = await db.Answer.findAll({
      where: { question_id: questionId },
      include: [{ model: db.User }, { model: db.Answers_vote }],
      order: [["createdAt", "DESC"]],
    });
    for (let answer of answers) {
      answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
    }
    res.render("question-detail", {
      title: "View Question",
      question,
      answers,
      spaces,
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

/////GET MY QUESTIONS PAGE/////
router.get(
  "/my-questions",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const myQuestions = await db.Question.findAll({
      where: { user_id: res.locals.user.id },
      include: [
        db.Questions_vote,
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
      question.date = question.updatedAt.toLocaleDateString("en-US", options);
      const answers = question.Answers;
      if (answers) {
        for (let answer of answers) {
          answer.date = answer.updatedAt.toLocaleDateString("en-US", options);
        }
      }
    }
    res.render("my-questions", {
      title: "My Questions",
      myQuestions,
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
    const myAnswers = await db.Answer.findAll({
      where: { user_id: res.locals.user.id },
      include: [
        db.User,
        db.Answers_vote,
        {
          model: db.Question,
          include: [db.User, db.Questions_vote],
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
      question.date = question.updatedAt.toLocaleDateString("en-US", options);
    }

    res.render("my-answers", {
      title: "My Answers",
      myAnswers,
      token: req.csrfToken(),
    });
  })
);

/////GET OUR STORY PAGE/////
router.get(
  "/our-story",
  asyncHandler(async (req, res, next) => {
    res.render("our-story", {
      title: "Our Story",
    });
  })
);

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
