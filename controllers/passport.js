'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

// ham nay duoc goi khi xac thuc thanh cong va luu thong tin user vao session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// ham duoc goi boi passport.session de lay thong tin cua user tu csdl va dua vao req.user
passport.deserializeUser(async (_id, done) => {
    try {
        let user = await User.findOne({_id});
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});

// ham xac thuc nguoi dung khi dang nhap
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // ten dang nhap la email
    passwordFiled: 'password',
    passReqToCallback: true // cho phep truyen req vao callback de kiem tra user da dang nhap hay chua

}, async (req, email, password, done) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return done(null, false, req.flash('loginMessage', errors.array()[0].msg));
    }
    if (email) {
        email: email.toLowerCase(); // chuyen dia chi email sang ky tu thuong
    }
    try {
        if (!req.session.user) { // neu user chua dang nhap
            let user = await User.findOne( { email: email });
            console.log(user)
            if (!user) { // neu email chua ton tai
                return done(null, false, req.flash('loginMessage', 'Email does not exist!'));
            }
            if (!bcrypt.compareSync(password, user.password)) { //neu mat khau khong dung
                return done(null, false, req.flash('loginMessage', 'Invalid Password!'));
            }
            // cho phep dang nhap
            return done(null, user);
        }
        // bo qua dang nhap
        done(null, req.session.user);
    }
    catch (error) {
        done(error);
    }
}
));


// ham dang ky tai khoan
passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordFiled: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    if (email) {
        email = email.toLowerCase();
    }
    if (req.session.isLoggedIn) { // neu nguoi dung da dang nhap, bo qua
        return done(null, req.session.user);
    }
    const axios = require('axios');
    const { response } = req.body;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${response}`;
    console.log(verifyUrl)
    axios.post(verifyUrl).then((verificationResponse)=>{
        const { success } = verificationResponse.data;
        //by pass
        // if (!success) {
        //   console.log("Please check captcha!")
        //   return done(false, req.flash('registerMessage', 'Please check captcha!'));
        // }
        User.findOne({ email: email })
        .then(user => {
          if (user) {
            console.log("email exist")
            return done(false, req.flash('registerMessage', 'Email exist!'));
          }
          bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword
          });
          console.log(user)
          user.save().then(()=>{
            return done(true, req.flash('registerMessage', 'Register successfully'));
          res.redirect('/login')
          });
        })
        .then(result => {
        })
        .catch(err => {
          console.log(err);
        });
        })
    })
    }
));


module.exports = passport;