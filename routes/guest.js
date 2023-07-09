const express = require('express');
const guestController = require('../controllers/guest');
const router = express.Router();

router.get('/', guestController.getDataHeader, guestController.getHomePage);
router.get('/categories/:category', guestController.getDataHeader, guestController.getListPaperCategory);
router.get('/tags/:tag', guestController.getDataHeader, guestController.getListPaperTag);
module.exports = router;
