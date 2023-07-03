const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const controller = {}

controller.getHomePage = (req, res, next) => {
    req.app.locals.layout = 'subcriber'
    res.render('subcriber/home', { path: '/subcriber', pageTitle: 'Home', });
};


controller.getProfilePage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'subcriber'

    res.render('subcriber/profile', { path: '/subcriber', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob, id: user._id, avatar: user.avatar });
};

controller.postUpdateProfile = async (req, res, next) => {
    req.app.locals.layout = 'subcriber'
    if (req.file) {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, dob: req.body.dob, avatar: req.file.filename } });
    } else {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, dob: req.body.dob } });
    }
    const user = await User.findById({ _id: req.session.user._id });
    let message = "Success!";
    res.render('subcriber/profile', { path: '/subcriber', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob, id: user._id, avatar: user.avatar, updateMessage: message });
    //res.redirect('subcriber/profile');
    //res.redirect('/subcriber/'); 
}


controller.getChangePwdPage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'subcriber'
    res.render('subcriber/change-pwd', { path: '/subcriber', pageTitle: 'Change Password', id: user._id, avatar: user.avatar });
};


controller.postChangePwd = async (req, res, next) => {

    req.app.locals.layout = 'subcriber'
    let user = await User.findById({ _id: req.body.user_id });
    let curPwd = req.body.currentPwd;
    let newPwd = req.body.newPwd;

    if (!bcrypt.compareSync(curPwd, user.password)) {
        res.render('subcriber/change-pwd', { path: '/subcriber', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Wrong current password!" });
    }
    else {
        const newPwdHash = await bcrypt.hash(newPwd, 12);
        const user1 = await User.findByIdAndUpdate({ _id: req.body.user_id }, { password: newPwdHash });
        res.render('subcriber/change-pwd', { path: '/subcriber', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Success!" });
    }

    //res.redirect('/subcriber/');
};




module.exports = controller; 
