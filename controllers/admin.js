const { validationResult } = require('express-validator/check');
const Users = require('../models/user');
const Cats = require('../models/category');
const Papers = require('../models/paper');
const Tags = require('../models/tag');
const tag = require('../models/tag');

function normalization(text) {
  return text.replace(/[^A-Za-z0-9]/g, '')
}
exports.getCategories = async (req, res, next) => {
  req.app.locals.layout = 'admin'
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  cats = (await Cats.find()).map(category => {
    ch = category['name']
    c = category.toObject()
    c['signname'] = normalization(ch)
    return c
  });
  
  count = cats.length
  cats = cats.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
  res.render('admin/categories', {
    path: '/admin/categories',
    pageTitle: 'Manage categories',
    listCategory: cats,
  });
}
exports.postCategories = (req, res, next) => {
  console.log(req.body)
  if (req.body.submitButton == "Delete") {
    // Delete objects by name
    Cats.deleteOne({ name: req.body['old-name'] }, (err, result) => {
      if (err) {
        console.error('Error deleting objects:', err);
      } else {
        console.log(`Deleted object(s)`);
      }
    });
  }
  else if (req.body["submitButton"] == "Update") {
    Cats.updateOne(
      { name: req.body['old-name'] }, // Filter to find the document to update
      {
        color: req.body["color-picker"],
        name: req.body['cat-name'],
        detail: req.body["detail"]
      },
      { new: true }
    ).then(updatedObject => {
      console.log('Object updated successfully');
      console.log(updatedObject);
    })
      .catch(error => {
        console.error('Error updating object:', error);
      });;
  }
  res.redirect("/admin/categories")
}
exports.getTags = async (req, res, next) => {
  req.app.locals.layout = 'admin'
  tags = (await Tags.find()).map(tag => {
    ch = tag['name']
    c = tag.toObject()
    c['signname'] = normalization(ch)
    return c
  });
  res.render('admin/tags', {
    path: '/admin/tags',
    pageTitle: 'Manage tags',
    listTag: tags,
  });
}
exports.postTags = (req, res, next) => {
  if (req.body["submitButton"] == "Delete") {
    // Delete objects by name
    Tags.deleteOne({ name: req.body['old-name'] }, (err, result) => {
      if (err) {
        console.error('Error deleting objects:', err);
      } else {
        console.log(`Deleted object(s)`);
      }
    });
  }
  else if (req.body["submitButton"] == "Update") {
    //  oldCat =  Cats.findOne({name: req.query['old-name']})
    console.log(req.body)
    Tags.updateOne(
      { name: req.body['old-name'] }, // Filter to find the document to update
      { name: req.body['tag-name'] },
      { new: true }
    ).then(updatedObject => {
      console.log('Object updated successfully');
      console.log(updatedObject);
    })
      .catch(error => {
        console.error('Error updating object:', error);
      });;
  }
  res.redirect("/admin/tags")
}

exports.postAddCategory = (req, res, next) => {

  Cats.exists({ name: req.body['cat-name'] }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result) {
        req.flash('error', 'Category exist!')
        console.log("Here")
        res.redirect('/admin/categories')
      }
      else {
        const cat = new Cats({
          name: req.body['cat-name'],
          color: req.body['color-picker'],
          detail: req.body['detail']
        });
        cat.save().then(
          res.redirect('/admin/categories')
        )

      }
    }
  });
}

exports.getUpdateTag = (req, res, next) => {
  if (req.query["submitButton"] == "Delete") {
    // Delete objects by name
    Tags.deleteOne({ name: req.query['old-name'] }, (err, result) => {
      if (err) {
        console.error('Error deleting objects:', err);
      } else {
        console.log(`Deleted object(s)`);
      }
    });
  }
  else if (req.query["submitButton"] == "Update") {
    //  oldCat =  Cats.findOne({name: req.query['old-name']})
    console.log(req.query)
    Tags.updateOne(
      { name: req.query['old-name'] }, // Filter to find the document to update
      { name: req.query['tag-name'] },
      { new: true }
    ).then(updatedObject => {
      console.log('Object updated successfully');
      console.log(updatedObject);
    })
      .catch(error => {
        console.error('Error updating object:', error);
      });;
  }
  res.redirect("/admin")
}

exports.postAddTag = (req, res, next) => {
  Tags.exists({ name: req.body['tag-name'] }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result) {
        req.flash('error', 'Tag exist!')
        res.redirect('/admin/tags')
      }
      else {
        const tag = new Tags({
          name: req.body['tag-name']
        });
        tag.save().then(
          res.redirect('/admin/tags')
        )

      }
    }
  });
}

exports.getListPaper = async (req, res, next) => {
  req.app.locals.layout = 'admin'
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  list = await (Papers.find().populate({ path: 'category_id', select: 'name color' })).populate('tags', 'name')
  
  count = list.length
  list = list.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
  res.render('admin/list-paper', {
    path: '/admin/list-paper',
    pageTitle: 'Manage papers',
    listPaper: list
  });

}

exports.getListPendingReviewPaper = async(req, res, next) => {
  req.app.locals.layout = 'admin'
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  list = await (Papers.find({status: "submitted"}).populate({ path: 'category_id', select: 'name color' })).populate('tags', 'name')
  count = list.length
  list = list.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
  
  res.render('admin/pending-review', {
    path: 'admin/pending-review',
    pageTitle: 'Manage papers',
    listPaper: list 
  });
}

exports.getListUser = (req, res, next) => {
  req.app.locals.layout = 'admin'
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  Users.find().then(users =>{
    count = users.length
    users = users.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
    res.render('admin/list-user', {
      path: 'admin/list-user',
      pageTitle: 'Manage user',
      listUser: users
    });
  })
}

exports.getAssignCat = async (req, res, next) => {
  req.app.locals.layout = 'admin'
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  Users.find({role: "Editor"}).populate('listCat').then(users =>{
    Cats.find().then(cats =>{
      count = cats.length
      cats = cats.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
      res.render('admin/assign-category', {
      path: 'admin/assign-category',
      pageTitle: 'Manage user',
      listUser: users,
      categories: cats
    });
    })
  })
}

exports.getRenew =  (req, res, next) => {
  
  req.app.locals.layout = 'admin'
  
  Users.updateOne(
    { _id: req.query.user_id }, // Filter to find the document to update
    {
      lastPaidDate : new Date()
    },
    { new: true }
  ).then(updatedObject => {
    console.log('Object updated successfully');
  })
    .catch(error => {
      console.error('Error updating object:', error);
    });;
  
    res.redirect("/admin/renew-account")
}

exports.getAssign =  (req, res, next) => {
  
  req.app.locals.layout = 'admin'
  console.log(req.query.category_id,  req.query.user_id)
  Users.updateOne(
    { _id: req.query.user_id }, // Filter to find the document to update
    {
      listCat : [req.query.category_id]
    },
    { new: true }
  ).then(updatedObject => {
    console.log('Object updated successfully');
  })
    .catch(error => {
      console.error('Error updating object:', error);
    });;
  
    res.redirect("/admin/assign-category")
}

exports.getRenewAccount = async (req, res, next) => {
  req.app.locals.layout = 'admin'
  const today  = new Date();
  let page = isNaN(req.query.page) ? 1 : Math.max(1, parseInt(req.query.page))
  const limit = 7;
  Users.find({role: "Subcriber"}).then(users =>{
      let tmp = JSON.parse(JSON.stringify(users))
      for(let i = 0 ; i < users.length; i++){
        if((today.getTime() - (users[i].lastPaidDate).getTime())/(1000 * 3600 * 24 ) <= 7){
          tmp[i].expired = 0
          tmp[i].left = 7 - parseInt(((today.getTime() - (users[i].lastPaidDate).getTime())/(1000 * 3600 * 24 )))
        }
        else{
          tmp[i].expired = 1
        }
      }
      count = tmp.length
      tmp = tmp.slice(limit * (page - 1), limit * page)
    
    res.locals.pagination = {
        page: page,
        limit: limit,
        totalRows: count,
        queryParams: req.query
    };
      res.render('admin/renew-account', {
      path: 'admin/renew-account',
      pageTitle: 'Manage user',
      listUser: tmp, 
    });
    })
}

exports.getPublishPaper = (req, res, next) => {
  
  req.app.locals.layout = 'admin'
  Papers.updateOne(
    { _id: req.query.paper_id }, // Filter to find the document to update
    {
      status : "published"
    },
    { new: true }
  ).then(updatedObject => {
    console.log('Object updated successfully');
  })
    .catch(error => {
      console.error('Error updating object:', error);
    });;
  
    res.redirect("/admin/pending-review")
}

exports.getShowPaper = (req, res, next) => {
  req.app.locals.layout = 'guest'
    const paper_id = req.query.paper_id
    console.log(paper_id)
    Paper.find({_id : paper_id})
    .populate({ path: 'category_id', select: 'color name' })
    .populate({ path: 'metadata_id', select: 'avaPaper content abstract' })
    .populate({ path: 'author_id', select: 'email'})
    .populate('tags').then(paper => {
        Comment.find({paper_id : paper_id})
        .populate({ path: 'user_id', select: 'email avatar'})
        .then(comments => {
                Paper.find({category_id : paper[0].category_id})
        .populate({ path: 'category_id', select: 'color name' })
        .populate({ path: 'metadata_id', select: 'avaPaper abstract' })
        .then(sameCatPapers => {
            console.log(sameCatPapers)
            res.render('paper/details', {
                path: 'paper',
                pageTitle: 'Admin',
                paper: paper[0],
                comments: comments,
                sameCatPapers: sameCatPapers
              });
            })
        })
        

        
    })
}