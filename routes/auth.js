const express = require('express');
const { check, body } = require('express-validator/check');
const passport = require('passport');
const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

// router.get('/',  (req, res, next) => {
//   res.redirect('/admin/categories')})

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  authController.postSignup
);

router.use('/logout', authController.postLogout);

router.get('/forgot-pwd', authController.getReset);

router.post('/forgot-pwd', authController.postReset);

router.get('/forgot-pwd/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
