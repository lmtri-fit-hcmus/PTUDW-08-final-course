const { validationResult } = require('express-validator/check');
const Cats = require('../models/category');
const Tags = require('../models/tag')

exports.getHomePage = async (req, res, next) => {
  req.app.locals.layout = 'admin'
    cats = (await Cats.find()).map(category => category.toObject());
    tags = (await Tags.find()).map(tag => tag.toObject());
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
