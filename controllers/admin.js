const { validationResult } = require('express-validator/check');

exports.getHomePage = (req, res, next) => {
  res.user.role = "admin"
  res.render('admin/home', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};
