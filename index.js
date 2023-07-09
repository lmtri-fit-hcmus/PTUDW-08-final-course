const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const expressHandlebars = require('express-handlebars');
const passport = require('./controllers/passport');
const { createPagination } = require('express-handlebars-paginate');
const methodOverride = require('method-override')



const errorController = require('./controllers/error');
const User = require('./models/user');


const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions'
});


const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const subcriberRoutes = require('./routes/subcriber');
const writerRoutes = require('./routes/writer');
const editorRoutes = require('./routes/editor');
const guestRoutes = require('./routes/guest')

app.engine('hbs', expressHandlebars.engine({
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  extname: 'hbs',
  defaultLayout: 'auth',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
  helpers: {
    createPagination,
    timeChange: function (publicationDate) {
      if (publicationDate) {
        return publicationDate.toDateString();
      }
    },
    handleSelected: function (tags, item) {
      let str = '  ';
      for (var i = 0; i < tags.length; i++) {
        if (JSON.stringify(tags[i]._id) == JSON.stringify(item._id)) {
          if (!str.includes(`<option value="${item._id}" selected>${item.name}</option>` && `<option value="${item._id}">${item.name}</option>`)) {
            str += `<option value="${item._id}" selected>${item.name}</option>`
            break;
          }
        }
      }
      for (var i = 0; i < tags.length; i++) {
        if (!str.includes(`<option value="${item._id}" selected>${item.name}</option>`)) {
          if (!str.includes(`<option value="${item._id}">${item.name}</option>`)) {
            str += `<option value="${item._id}">${item.name}</option>`
          }
        }
      }
      return str;
    },
    checkCatPremium: function (checkPre, item) {
      if (checkPre) {
        return `<a class="item-title m-0 p-1" href="#da check" id="title">${item}</a>`; //href detail
      }
      else {
        return `<a class="item-title m-0 p-1" href="#bat re new" id="title">${item}</a>`; //href renew
      }
    },
    checkTopWeekPremium: function (checkPre, item) {
      if (checkPre) {
        return `<a href="#da check" class="text-decoration-none text-white" id="title">${item}</a>`; //href detail
      }
      else {
        return `<a href="#bat re new" class="text-decoration-none text-white" id="title">${item}</a>`; //href renew
      }
    },
    checkTop10Premium: function (checkPre, item) {
      if (checkPre) {
        return `<a class="top-10-item-title m-0 p-1" href="#da check" id="title">${item}</a>`; //href detail
      }
      else {
        return `<a class="top-10-item-title m-0 p-1" href="#bat re new" id="title">${item}</a>`; //href renew
      }
    },
  }
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use('/',authRoutes);
app.use('/', guestRoutes);
app.use('/admin', adminRoutes);
app.use('/subcriber', subcriberRoutes);
app.use('/writer', writerRoutes);
app.use('/editor', editorRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
