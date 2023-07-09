const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const User = require('../models/user')
const Paper = require('../models/paper');
const Metadata = require('../models/metadata');
const Tags = require('../models/tag')
const Comment = require("../models/comment");
const bcrypt = require('bcrypt');
const metadata = require('../models/metadata');
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
    req.app.locals.layout = 'writer'
    res.render('writer/home', { path: '/writer', pageTitle: '08 Newspaper' });
};

controller.getPublished = async (req, res, next) => {
    req.app.locals.layout = 'writer'

    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listPaper = await Paper.find({ author_id: req.user._id, status: "published" })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ author_id: req.user._id, status: "published" }).count();

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('writer/published', { path: '/writer', pageTitle: 'Published', listPaper: listPaper });
};

controller.getAccepted = async (req, res, next) => {
    req.app.locals.layout = 'writer'

    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listPaper = await Paper.find({ author_id: req.user._id, status: "accepted" })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ author_id: req.user._id, status: "accepted" }).count();

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('writer/accepted', { path: '/writer', pageTitle: 'Accepted', listPaper: listPaper });

};

controller.getRejected = async (req, res, next) => {
    req.app.locals.layout = 'writer'

    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;
    const listPaper = await Paper.find({ author_id: req.user._id, status: "rejected" })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ author_id: req.user._id, status: "rejected" }).count();

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('writer/rejected', { path: '/writer', pageTitle: 'Rejected', listPaper: listPaper });
};

controller.getSubmitted = async (req, res, next) => {
    req.app.locals.layout = 'writer'

    let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))

    const limit = 5;

    const listPaper = await Paper.find({ author_id: req.user._id, status: "submitted" })
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .populate('tags')
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Paper.find({ author_id: req.user._id, status: "submitted" }).count();

    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('writer/submitted', { path: '/writer', pageTitle: 'Submitted', listPaper: listPaper });
};

controller.getProfilePage = async (req, res, next) => {
    const user = await User.findById({ _id: req.session.user._id });
    req.app.locals.layout = 'writer'
    if (user.dob) {
        res.render('writer/profile', {
            path: '/writer', pageTitle: 'Profile', email: user.email, penName: user.penName, name: user.name, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar
        });
    } else {
        res.render('writer/profile', {
            path: '/writer', pageTitle: 'Profile', email: user.email, penName: user.penName, name: user.name, id: user._id, avatar: user.avatar
        });
    }

};

controller.postUpdateProfile = async (req, res, next) => {

    req.app.locals.layout = 'writer'
    dob = new Date(req.body.dob)
    if (req.file) {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, penName: req.body.penName, email: req.body.email, dob: dob, avatar: req.file.filename } });
    } else {
        const user = await User.findByIdAndUpdate({ _id: req.body.user_id }, { $set: { name: req.body.name, penName: req.body.penName, email: req.body.email, dob: dob } });
    }
    const user = await User.findById({ _id: req.session.user._id });
    let message = "Success!";
    res.render('writer/profile', { path: '/writer', pageTitle: 'Profile', email: user.email, name: user.name, penName: user.penName, dob: user.dob.toISOString().replace(/T00:00:00.000Z$/, ""), id: user._id, avatar: user.avatar, updateMessage: message });
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

controller.postPaper = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    let user = await User.findById({ _id: req.session.user._id });

    const tags = req.body.tags.split(',');

    const metadata = await Metadata.create({
        avaPaper: req.file.filename,
        abstract: req.body.abstract,
        content: req.body.content
    });
    const paper = await Paper.create({
        title: req.body.title,
        tags: tags,
        category_id: req.body.category,
        author_id: user._id,
        metadata_id: metadata._id
    })
    res.render('writer/submitted', { path: '/writer', pageTitle: 'Submitted' });
}

controller.getEditPaper = async (req, res, next) => {
    req.app.locals.layout = 'writer'

    const paper = await Paper.findOne({ _id: req.params.id })
        .populate({ path: 'category_id' })
        .populate({ path: 'metadata_id' })
        .populate('tags')

    const listTag = await Tags.find({});
    const listCat = await Cats.find({});

    const tagsSelected = paper.tags;
    const catSelected = []
    catSelected.push(paper.category_id);


    res.locals.listCat = listCat
    res.locals.catSelected = catSelected;
    res.locals.listTag = listTag
    res.locals.tagsSelected = tagsSelected

    res.render('writer/editPaper', { path: '/writer', pageTitle: 'Edit paper', paper: paper });

}

controller.updatePaper = async (req, res, next) => {
    // const paper = await Paper.findOneAndUpdate({ _id: req.params.id },
    //     { $set: { title:req.body.title,} });
    const paper = await Paper.findOne({ _id: req.params.id });
    console.log(paper)
    console.log(req.body.tags);
    if (req.file) {
        const metadata = await Metadata.findByIdAndUpdate({ _id: paper.metadata_id },
            { $set: { abstract: req.body.abstract, content: req.body.content, avaPaper: req.file.filename } })

        await Paper.findByIdAndUpdate({ _id: req.params.id },
            { $set: { title: req.body.title, tags: req.body.tags.split(','), category_id: req.body.category, metadata_id: metadata._id } })
    }
    else {
        const metadata = await Metadata.findByIdAndUpdate({ _id: paper.metadata_id },
            { $set: { abstract: req.body.abstract, content: req.body.content } })

        await Paper.findByIdAndUpdate({ _id: req.params.id },
            { $set: { title: req.body.title, tags: req.body.tags.split(','), category_id: req.body.category, metadata_id: metadata._id } })
    }
    res.redirect('/writer/')
}

controller.deletePaper = async (req, res, next) => {
    req.app.locals.layout = 'writer'
    const paper = await Paper.updateOne({ _id: req.params.id }, { $set: { status: 'deleted' } })
        .then(() => res.redirect('back'));
    //res.render('writer/submitted')
    //console.log(req.params.id);
    // Course.delete({ _id: req.params.id })
    //     .then(() => res.redirect('back'))
    //     .catch(next);
}

module.exports = controller; 
