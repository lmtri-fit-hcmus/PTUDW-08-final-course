const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const Tags = require('../models/tag')

function normalization(text){
  return text.replace(/[^A-Za-z0-9]/g, '')
}

exports.getHomePage = async (req, res, next) => {
  req.app.locals.layout = 'admin'
    cats = (await Cats.find()).map(category => {
      ch = category['name']
      c = category.toObject()
      c['signname'] = normalization(ch)
      return c
    });
    tags = (await Tags.find()).map(tag => {
      ch = tag['name']
      c = tag.toObject()
      c['signname'] = normalization(ch)
      return c
    });
    res.render('admin/home', {
      path: '/admin',
      pageTitle: 'Home',
      listCategory: cats,
      listTag: tags,
    });
};

exports.getUpdateCategory =  (req, res, next) => { 
  if(req.query["submitButton"] == "Delete"){   
    // Delete objects by name
    Cats.deleteOne({ name: req.query['old-name']  }, (err, result) => {
      if (err) {
        console.error('Error deleting objects:', err);
      } else {
        console.log(`Deleted object(s)`);
      }
    });
    console.log(Cats.find().then(res=>console.log(res)))
    
  }
  else if(req.query["submitButton"] == "Update"){
  //  oldCat =  Cats.findOne({name: req.query['old-name']})
  Cats.updateOne(
      { name: req.query['old-name'] }, // Filter to find the document to update
       {color:  req.query["color-picker"],
                 name:  req.query['cat-name'], 
                  detail:  req.query["detail"] }, 
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

exports.getAddCategory =  (req, res, next) => {

  Cats.exists({name: req.query['cat-name']}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if(result){
        req.flash('error','Category exist!')
        console.log("Here")
        res.redirect('/admin') 
      }
      else{
        const cat = new Cats({
          name: req.query['cat-name'],
          color: req.query['color-picker'],
          detail: req.query['detail']
        });
        cat.save().then(
          res.redirect('/admin') 
        )

      }
    }
  });
}

exports.getUpdateTag = (req, res, next)=>{
  if(req.query["submitButton"] == "Delete"){   
    // Delete objects by name
    Tags.deleteOne({ name: req.query['old-name']  }, (err, result) => {
      if (err) {
        console.error('Error deleting objects:', err);
      } else {
        console.log(`Deleted object(s)`);
      }
    });
  }
  else if(req.query["submitButton"] == "Update"){
  //  oldCat =  Cats.findOne({name: req.query['old-name']})
  console.log(req.query)
  Tags.updateOne(
      { name: req.query['old-name'] }, // Filter to find the document to update
       { name:  req.query['tag-name']}, 
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

exports.getAddTag = (req, res, next) => {
  console.log(req.query)
  Tags.exists({name: req.query['tag-name']}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if(result){
        req.flash('error','Tag exist!')
        res.redirect('/admin') 
      }
      else{
        const tag = new Tags({
          name: req.query['tag-name']
        });
        tag.save().then(
          res.redirect('/admin') 
        )

      }
    }
  });
}