var express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const bcrypt = require('bcryptjs');
const {loginUser, logoutUser}=require('../auth.js')

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
router.get('/signup', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-signup', {
    title: 'Sign up',
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post('/signup', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
    const {
      user_name, email, occupation, password
    } = req.body;

    const user = db.User.build({
      user_name,
      email,
      occupation,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashed_password = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('user-signup', {
        title: 'Sign up',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
}));

const loginValidators = [
  check('user_name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for your user name'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Log in',
    csrfToken: req.csrfToken(),
  });
});

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      user_name,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { user_name } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashed_password.toString());
        
        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }
      errors.push('Login failed for the provided username and password')
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('user-login', {
      title: 'Login',
      user_name,
      errors,
      csrfToken: req.csrfToken(),
    });
}));

router.post('/logout', (req,res) => {
  logoutUser(req, res);
  res.redirect('/users/login');
});

module.exports = router;
