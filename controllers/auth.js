const crypto = require('crypto');
var bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const axios = require('axios');
const passport = require('passport');

exports.getLogin = (req, res, next) => {
  req.app.locals.layout = 'auth'
  if(!req.session.isLoggedIn){
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    req.app.locals.layout = 'auth'
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: message,
      oldInput: {
        email: '',
        password: ''
      },
      validationErrors: []
    });
  }
  else{
    res.redirect("/")
  }
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local-login', (user, _) => {
    errMsg = req.flash('loginMessage')
    if (!user) {
      //req.flash('error', message.message);
      req.app.locals.layout = 'auth'
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errMsg,
      });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    console.log(user)
    return req.session.save(err => {
      res.redirect(`/${user.role.toLowerCase()}`);
    });
  })(req, res, next);
}

exports.postSignup = (req, res, next) => {
    passport.authenticate('local-register', (success, message) => {
      console.log( req.flash('registerMessage'))
      if(success){
        res.redirect("/login")
      }
      else{
        return res.status(422).render('auth/signup', {
          path: '/signup',
          pageTitle: 'Sign Up',
          errorMessage: req.flash('registerMessage'),
          validationErrors: []
        });
      }
    })(req, res, next);

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
       //send mail
       host= "127.0.0.1"
       const resetLink = `${req.protocol}://${host}/reset?token=${sign(token)}&email=${email}`
       const { sendForgotPasswordMail } = require('./mail');
        sendForgotPasswordMail(user, host, resetLink)
            .then((result) => {
                console.log('email has been send');
                return res.render('forgot-password', { done: true });
            })
            .catch(error => {
                console.log(error.statusCode);
                return res.render('forgot-password', { message: 'An error has occured when sending to your email. Please check your email address!' });
            })
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};
