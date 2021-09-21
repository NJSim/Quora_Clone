var express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');
const {loginUser}=require('../auth.js')

var router = express.Router();

const userValidators = [
  check('user_name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for User Name')
    .isLength({ max: 50 })
    .withMessage('User Name must not be more than 50 characters long')
    .custom((value) => {
      return db.User.findOne({ where: { user_name: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided user name is already in use by another account');
          }
        });
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('occupation')
    .isLength({ max: 100 })
    .withMessage('Occupation must not be more than 100 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      })
];

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

router.post('/signup', csrfProtection, userValidators, 

  asyncHandler(async (req, res) => {
    const {
      user_name, email, occupation, password
    } = req.body;
    console.log('1')
    const user = db.User.build({
      user_name,
      email,
      occupation,
    });
    console.log('2')
    const validatorErrors = validationResult(req);
    console.log(validatorErrors)
    if (validatorErrors.isEmpty()) { console.log('4')
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashed_password = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      console.log('5')
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('user-signup', {
        title: 'Sign up',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
}));

module.exports = router;
