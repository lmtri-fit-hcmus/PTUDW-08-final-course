const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const Paper = require('../models/paper');
const Metadata = require('../models/metadata');
const Comment = require("../models/comment");
const Tags = require('../models/tag');
const bcrypt = require('bcrypt');
const controller = {}

controller.getDataHeader = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    res.locals.avatar = user.avatar;

    const categories = await Cats.find({})
    res.locals.categories = categories;

    const tags = await Tags.find({})
    res.locals.tags = tags;
    next();
}

controller.getHomePage = async (req, res, next) => {
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
    let top10Cat = [];
    for (var i = 0; i < 10; i++) {
        if (result[i] != undefined) {
            const paper = await Paper.findOne({ category_id: result[i]._id })
                .populate({ path: 'category_id', select: 'color name' })
                .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
                .sort({ viewCount: -1 })

            top10Cat[i] = paper;
        }
    }

    const topWeekPapers = await Paper.find({ status: 'published' })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .sort({ viewCount: -1 })
        .limit(3);

    const topTrendPapers = await Paper.find({ status: 'published' })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .sort({ viewCount: -1 })
        .limit(10);

    const topNewPapers = await Paper.find({ status: 'published' })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .sort({ publicationDate: -1 })
        .limit(10);

    const otherPapers = await Paper.find({ status: 'published' })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .limit(8);

    res.render('subcriber/home', {
        path: '/subcriber', pageTitle: '08 Newspaper',
        topWeekPapers: topWeekPapers,
        topTrendPapers: topTrendPapers,
        topNewPapers: topNewPapers,
        otherPapers: otherPapers,
        top10Cat: top10Cat,
    });
};


controller.getProfilePage = async (req, res, next) => {
    req.app.locals.layout = 'subcriber'
    const user = await User.findById({ _id: req.session.user._id });
    if (user.dob) {
        res.render('subcriber/profile', { path: '/subcriber', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar });
    } else {
        res.render('subcriber/profile', { path: '/subcriber', pageTitle: 'Profile', email: user.email, name: user.name, id: user._id, avatar: user.avatar });
    }
};

controller.postUpdateProfile = async (req, res, next) => {
    req.app.locals.layout = 'subcriber'
    dob = new Date(req.body.dob)
    if (req.file) {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id },
            { $set: { name: req.body.name, email: req.body.email, dob: dob, avatar: req.file.filename } });
    } else {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id },
            { $set: { name: req.body.name, email: req.body.email, dob: dob } });
    }
    const user = await User.findById({ _id: req.session.user._id });
    let message = "Success!";
    res.render('subcriber/profile', { path: '/subcriber', pageTitle: 'Profile', email: user.email, name: user.name, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar, updateMessage: message });
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
        res.render('subcriber/change-pwd', { path: '/subcriber', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessageW: "Wrong current password!" });
    }
    else {
        const newPwdHash = await bcrypt.hash(newPwd, 12);
        const user1 = await User.findByIdAndUpdate({ _id: req.body.user_id }, { password: newPwdHash });
        res.render('subcriber/change-pwd', { path: '/subcriber', pageTitle: 'Change Password', avatar: user.avatar, changePwdMessageS: "Success!" });
    }
};

controller.getListPaperCategory = async (req, res, next) => {
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    let checkPremium
    let expireDate = new Date(req.user.lastPaidDate);

    expireDate.setDate(req.user.lastPaidDate.getDate() + 7)
    nowDate = new Date();
    if (nowDate < expireDate) {
        checkPremium = true;
    }
    else {
        checkPremium = false;
    }

    req.app.locals.layout = 'subcriber'
    const cat = await Cats.findOne({ name: req.params.category })

    const listPaperCat = await Paper.find({ category_id: cat._id })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .populate('tags')
        .sort({ isPremium: -1 })
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ category_id: cat._id, status: 'published' }).count();
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('subcriber/category', { path: '/subcriber', pageTitle: req.params.category, listPaperCat: listPaperCat, catName: cat.name });
}



module.exports = controller; 
