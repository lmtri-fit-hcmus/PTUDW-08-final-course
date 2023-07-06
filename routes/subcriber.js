const path = require('path');
const multer = require('multer')
const express = require('express');
const { check, validationResult } = require('express-validator/check');

const subcriberController = require('../controllers/subcriber');
const isAuth = require('../middleware/is-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const upload = multer({
    storage: storage
})



const router = express.Router();
// /sub/add-product => POST
router.get('/', subcriberController.getDataHeader, subcriberController.getHomePage);
router.get('/profile', isAuth, subcriberController.getDataHeader, subcriberController.getProfilePage);
router.post('/profile', isAuth, upload.single('avatar'), subcriberController.postUpdateProfile);

router.get('/change-pwd', isAuth, subcriberController.getDataHeader, subcriberController.getChangePwdPage);
router.post('/change-pwd', isAuth, subcriberController.postChangePwd);
router.get('/:name', isAuth, subcriberController.getDataHeader, subcriberController.getListPaperCategory);

module.exports = router;

//[check('name').trim().isLength({ min: 1 }).withMessage('Name is required!')],
// (req, res, next) => {
//     let message = validationResult(req);
//     if (message) {
//         return res.render('subcriber/profile', { updateMessage: message });
//     }
//     next();
// },


