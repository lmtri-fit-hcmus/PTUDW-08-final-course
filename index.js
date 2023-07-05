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



const errorController = require('./controllers/error');
const User = require('./models/user');


const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions'
});


const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const subcriberRoutes = require('./routes/subcriber')

app.engine('hbs', expressHandlebars.engine({
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  extname: 'hbs',
  defaultLayout: 'auth',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  },
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

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

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/subcriber', subcriberRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URL)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
