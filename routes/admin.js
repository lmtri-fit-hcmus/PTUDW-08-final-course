const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { isInt8Array } = require('util/types');
const { admin } = require('googleapis/build/src/apis/admin');

const router = express.Router();
//admin/add-product => POST
router.get('/', isAuth, (req, res, next) => {
  res.redirect('/admin/categories')
}
)
router.get('/categories', isAuth, adminController.getCategories)
router.get('/tags', isAuth, adminController.getTags)
router.post('/categories', isAuth, adminController.postCategories)
router.post('/tags', isAuth, adminController.postTags)
router.post('/tags/add', isAuth, adminController.postAddTag)
router.post('/categories/add', isAuth, adminController.postAddCategory)

router.get('/list-paper', isAuth, adminController.getListPaper)
router.get('/pending-review', isAuth, adminController.getListPendingReviewPaper)

module.exports = router;
