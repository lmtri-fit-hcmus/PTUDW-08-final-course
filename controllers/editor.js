const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const Paper = require('../models/paper');
const Metadata = require('../models/metadata');
const Comment = require("../models/comment");
const bcrypt = require('bcrypt');
const controller = {}

controller.getDataHeader = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id }).populate('listCat');
    res.locals.avatar = user.avatar;

    res.locals.categories = user.listCat;
    console.log(user.listCat[0])
    // const tags = await Tags.find({})
    // res.locals.tags = tags;
    next();
}

controller.getHomePage = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    const user = await User.findById({ _id: req.session.user._id }).populate('listCat');

    listDraft = []
    for (var i = 0; i < user.listCat.length; i++) {
        const paper = await Paper.find({ category_id: user.listCat[i]._id })
            .populate('category_id')
            .populate('metadata_id')
            .sort({ viewCount: -1 })
        for (var j = 0; j < 100; j++) {
            if (paper[j]) {
                listDraft.push(paper[j]);
            }
            else {
                break;
            }
        }
    }
    console.log(listDraft);

    res.render('editor/home', { path: '/editor', pageTitle: '08 Newspaper', listDraft: listDraft });
};


controller.getProfilePage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'editor'
    if (user.dob) {
        res.render('editor/profile', {
            path: '/editor', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar
        });
    } else {
        res.render('editor/profile', {
            path: '/editor', pageTitle: 'Profile', email: user.email, name: user.name, id: user._id, avatar: user.avatar
        });
    }

};

controller.postUpdateProfile = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    dob = new Date(req.body.dob)
    if (req.file) {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, dob: dob, avatar: req.file.filename } });
    } else {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, email: req.body.email, dob: dob } });
    }
    const user = await User.findById({ _id: req.session.user._id });
    let message = "Success!";
    res.render('editor/profile', { path: '/editor', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar, updateMessage: message });
    //res.redirect('editor/profile');
    //res.redirect('/editor/'); 
}

controller.getChangePwdPage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'editor'
    res.render('editor/change-pwd', { path: '/editor', pageTitle: 'Change Password', id: user._id, avatar: user.avatar });
};

controller.postChangePwd = async (req, res, next) => {

    req.app.locals.layout = 'editor'
    let user = await User.findById({ _id: req.body.user_id });
    let curPwd = req.body.currentPwd;
    let newPwd = req.body.newPwd;

    if (!bcrypt.compareSync(curPwd, user.password)) {
        res.render('editor/change-pwd', { path: '/editor', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Wrong current password!" });
    }
    else {
        const newPwdHash = await bcrypt.hash(newPwd, 12);
        const user1 = await User.findByIdAndUpdate({ _id: req.body.user_id }, { password: newPwdHash });
        res.render('editor/change-pwd', { path: '/editor', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessage: "Success!" });
    }

    //res.redirect('/editor/');
};


module.exports = controller; 
