const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const Paper = require('../models/paper');
const Metadata = require('../models/metadata');
const Comment = require("../models/comment");
const bcrypt = require('bcrypt');
const controller = {}

controller.getHomePage = async (req, res, next) => {
    // const newP = await new Paper({
    //     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    //     title: "This is the best of category",
    //     author_id: "64a2ed1892217a5ed456417a",
    //     publicationDate: "1999-02-26",
    //     viewCount: 100,
    //     isPremium: false,
    //     approveBy: "64a4025c457a1795203379b8",
    //     category_id: "64a2eb8d0a57b42e5cc4ba88",
    //     metadata_id: "64a5d5efb8bf7b40a2e07536",
    //     comments: "64a57cec862b81c7b80729df"
    // });
    // newP.save();
    req.app.locals.layout = 'subcriber'

    const result = await Paper.aggregate([
        {
            $group: {
                _id: "$category_id",
                subTotal: { $sum: "$viewCount" }
            }
        },
        { $sort: { subTotal: -1 } },
        { $limit: 10 }
    ])
    console.log(result[7]);
    let top10Cat = [];
    for (var i = 0; i < 10; i++) {
        if (result[i] != undefined) {
            const paper = await Paper.find({ category_id: result[i]._id })
                .populate('category_id')
                .populate('author_id')
                .populate('metadata_id')
                .populate('comments')
                .sort({ viewCount: -1 })
                .limit(1);
            //res.locals.top10Cat[i] = paper;
            top10Cat[i] = paper[0];
        }
    }
    //console.log(top10Cat);
    //console.log(top10Cat[1]);
    //console.log(Object.assign({}, top10Cat));
    const topWeekPapers = await Paper.find({})
        .populate('category_id')
        .populate('author_id')
        .populate('metadata_id')
        .populate('comments')
        .sort({ viewCount: -1 })
        .limit(3);
    //console.log(typeof topWeekPapers);
    //console.log(topWeekPapers);
    const topTrendPapers = await Paper.find({})
        .populate('category_id')
        .populate('author_id')
        .populate('metadata_id')
        .populate('comments')
        .sort({ viewCount: -1 })
        .limit(10);

    const topNewPapers = await Paper.find({})
        .populate('category_id')
        .populate('author_id')
        .populate('metadata_id')
        .populate('comments')
        .sort({ createdAt: -1 })
        .limit(10);

    const otherPapers = await Paper.find({})
        .populate('category_id')
        .populate('author_id')
        .populate('metadata_id')
        .populate('comments')
        .limit(8);

    res.render('subcriber/home', {
        path: '/subcriber', pageTitle: 'Home',
        topWeekPapers: topWeekPapers,
        topTrendPapers: topTrendPapers,
        topNewPapers: topNewPapers,
        otherPapers: otherPapers,
        top10Cat: top10Cat
    });
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
