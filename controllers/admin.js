const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
exports.getHomePage = (req, res, next) => {
  req.app.locals.layout = 'admin'
  res.render('admin/home', {
    path: '/admin',
    pageTitle: 'Home',
  });
};
