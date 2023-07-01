const { validationResult } = require('express-validator/check');

exports.getHomePage = (req, res, next) => {
  res.send("test``")
};
