const path = require('path');
const multer = require('multer')
const express = require('express');
const { check, validationResult } = require('express-validator/check');

const writerController = require('../controllers/writer');
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
router.get('/', writerController.getDataHeader, writerController.getHomePage);

router.get('/published', writerController.getDataHeader, writerController.getPublished)
router.get('/accepted', writerController.getDataHeader, writerController.getAccepted);
router.get('/rejected', writerController.getDataHeader, writerController.getRejected);
router.get('/submitted', writerController.getDataHeader, writerController.getSubmitted);

router.get('/profile', isAuth, writerController.getDataHeader, writerController.getProfilePage);
router.post('/profile', isAuth, upload.single('avatar'), writerController.postUpdateProfile);

router.get('/change-pwd', isAuth, writerController.getDataHeader, writerController.getChangePwdPage);
router.post('/change-pwd', isAuth, writerController.postChangePwd);
// router.get('/:name', isAuth, writerController.getDataHeader, writerController.getListPaperCategory);

module.exports = router;

//[check('name').trim().isLength({ min: 1 }).withMessage('Name is required!')],
// (req, res, next) => {
//     let message = validationResult(req);
//     if (message) {
//         return res.render('writer/profile', { updateMessage: message });
//     }
//     next();
// },


