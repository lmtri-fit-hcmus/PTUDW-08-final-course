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
    // const tags = await Tags.find({})
    // res.locals.tags = tags;
    next();
}

controller.getHomePage = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    const user = await User.findById({ _id: req.session.user._id }).populate('listCat');
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listDraft = await Paper.find({ category_id: user.listCat[0]._id, status: 'submitted' })
        .populate('category_id')
        .populate('metadata_id')
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ category_id: user.listCat[0]._id, status: 'submitted' }).count();
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };


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


controller.acceptPaper = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    await Paper.findByIdAndUpdate({ _id: req.params.id },
        {
            $set: {
                publicationDate: dateUpdate,
                status: 'published',
                approve_by: req.user._id
            }
        })
    res.redirect('back')
}

controller.rejectPaper = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    const test = await Paper.findByIdAndUpdate({ _id: req.params.id },
        {
            $set: {
                note: req.body.note,
                status: 'rejected',
                reject_by: req.user._id
            }
        })
    res.redirect('back')
}


controller.getApprovePaper = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    const user = await User.findById({ _id: req.session.user._id }).populate('listCat');
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listDraft = await Paper.find({ category_id: user.listCat[0]._id, approve_by: req.user._id })
        .populate('category_id')
        .populate('metadata_id')
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ category_id: user.listCat[0]._id, approve_by: req.user._id }).count();
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };

    res.render('editor/approve', { path: '/editor', pageTitle: '08 Newspaper', listDraft: listDraft });

}

controller.getRejectPaper = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    const user = await User.findById({ _id: req.session.user._id }).populate('listCat');
    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listDraft = await Paper.find({ category_id: user.listCat[0]._id, reject_by: req.user._id })
        .populate('category_id')
        .populate('metadata_id')
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ category_id: user.listCat[0]._id, reject_by: req.user._id }).count();
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };

    res.render('editor/reject', { path: '/editor', pageTitle: '08 Newspaper', listDraft: listDraft });

}

module.exports = controller; 
