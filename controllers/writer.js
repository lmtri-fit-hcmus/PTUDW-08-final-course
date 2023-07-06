const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const Paper = require('../models/paper');
const Metadata = require('../models/metadata');
const Comment = require("../models/comment");
const bcrypt = require('bcrypt');
const controller = {}

controller.getDataHeader = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    res.locals.avatar = user.avatar;

    // const categories = await Cats.find({})
    // res.locals.categories = categories;

    // const tags = await Tags.find({})
    // res.locals.tags = tags;
    next();
}

controller.getHomePage = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    res.render('writer/home', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getPublished = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    res.render('writer/published', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getAccepted = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    res.render('writer/accepted', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getRejected = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    res.render('writer/rejected', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getSubmitted = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    res.render('writer/submitted', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getProfilePage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'writer'
    res.render('writer/profile', {
        path: '/writer', pageTitle: 'Profile', email: user.email, penName: user.penName, name: user.name, dob: user.dob, id: user._id, avatar: user.avatar
    });
};

controller.postUpdateProfile = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    if (req.file) {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, penName: req.body.penName, email: req.body.email, dob: req.body.dob, avatar: req.file.filename } });
    } else {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, penName: req.body.penName, email: req.body.email, dob: req.body.dob } });
    }
    const user = await User.findById({ _id: req.session.user._id });
    let message = "Success!";
    res.render('writer/profile', { path: '/writer', pageTitle: 'Profile', email: user.email, name: user.name, penName: user.penName, dob: user.dob, id: user._id, avatar: user.avatar, updateMessage: message });
    //res.redirect('writer/profile');
    //res.redirect('/writer/'); 
}

controller.getChangePwdPage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'writer'
    res.render('writer/change-pwd', { path: '/writer', pageTitle: 'Change Password', id: user._id, avatar: user.avatar });
};


controller.postChangePwd = async (req, res, next) => {

    req.app.locals.layout = 'writer'
    let user = await User.findById({ _id: req.body.user_id });
    let curPwd = req.body.currentPwd;
    let newPwd = req.body.newPwd;

    if (!bcrypt.compareSync(curPwd, user.password)) {
        res.render('writer/change-pwd', { path: '/writer', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Wrong current password!" });
    }
    else {
        const newPwdHash = await bcrypt.hash(newPwd, 12);
        const user1 = await User.findByIdAndUpdate({ _id: req.body.user_id }, { password: newPwdHash });
        res.render('writer/change-pwd', { path: '/writer', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Success!" });
    }

    //res.redirect('/writer/');
};


module.exports = controller; 
