const path = require('path');
const multer = require('multer')
const express = require('express');
const { check, validationResult } = require('express-validator/check');

const editorController = require('../controllers/editor');
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
router.get('/', editorController.getDataHeader, editorController.getHomePage);

router.get('/profile', isAuth, editorController.getDataHeader, editorController.getProfilePage);
router.post('/profile', isAuth, upload.single('avatar'), editorController.postUpdateProfile);

router.get('/change-pwd', isAuth, editorController.getDataHeader, editorController.getChangePwdPage);
router.post('/change-pwd', isAuth, editorController.postChangePwd);


router.put('/accept/:id', isAuth, editorController.getDataHeader, editorController.acceptPaper);
router.put('/reject/:id', isAuth, editorController.getDataHeader, editorController.rejectPaper);

router.get('/approve', isAuth, editorController.getDataHeader, editorController.getApprovePaper);
router.get('/reject', isAuth, editorController.getDataHeader, editorController.getRejectPaper);
// router.put('/reject/:id',)
module.exports = router;
