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
router.get('/pending-review/publish', isAuth, adminController.getPublishPaper)
router.get('/pending-review', isAuth, adminController.getListPendingReviewPaper)


router.get('/list-user', isAuth, adminController.getListUser)

router.get('/assign-category/assign', isAuth, adminController.getAssign)
router.get('/assign-category', isAuth, adminController.getAssignCat)

router.get('/renew-account/renew', isAuth, adminController.getRenew)
router.get('/renew-account', isAuth, adminController.getRenewAccount)
router.get('/paper', isAuth ,adminController.getShowPaper)

module.exports = router;
