const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { isInt8Array } = require('util/types');

const router = express.Router();
// /admin/add-product => POST
router.get(
  '/',
  isAuth,
  adminController.getHomePage
);
router.get(
  '/update-category',
  isAuth,
  adminController.getUpdateCategory
);
router.get(
  '/add-category',
  isAuth,
  adminController.getAddCategory
)
router.get(
  '/update-tag',
  isAuth,
  adminController.getUpdateTag
)
router.get(
  '/add-tag',
  isAuth,
  adminController.getAddTag
)

module.exports = router;
