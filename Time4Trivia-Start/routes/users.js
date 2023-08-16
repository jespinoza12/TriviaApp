const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Time 4 Trivia', error: '' });
});

router.post('/register', async function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;

  let result = await userController.createUser(username, email, firstName, lastName, password);

  if (result?.status == STATUS_CODES.success) {
    res.redirect('/u/login');
  } else {
    res.render('register', { title: 'Time 4 Trivia', error: 'Register Failed' });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Time 4 Trivia', error: '' });
});

router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  let result = await userController.login(username, password);

  if (result?.status == STATUS_CODES.success) {
    let isAdmin = result.data.roles.includes('admin');
    if (isAdmin){
      isAdmin = "yes"
    }else {
      isAdmin = "no"
    }

    req.session.user = {
      userId: result.data.userId,
      username: result.data.username,
      isAdmin: isAdmin
    };
    res.redirect('/');
  } else {
    res.render('login', { title: 'Time 4 Trivia', error: 'Invalid Login. Please try again.' });
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => { if (err) { console.log(err); } });
  res.redirect('/');
});

router.get('/profile', async function (req, res, next) {
  if(!req.session.user || !req.session.user.userId){
    res.redirect('/u/login');
  }else{
    let user = await userController.getUserById(req.session.user.userId);
    res.render('profile', { title: 'Time 4 Trivia', user: user, error: '' });
  }
});

router.post('/profile', async function (req, res, next) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  if (!firstName || firstName == "" || !lastName || lastName == "") {
    res.render('profile', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.user.isAdmin, error: 'First and Last name are required.' });
  } else {
    let result = await userController.updateProfile(req.session.user.userId, firstName, lastName);
    if (result.status == STATUS_CODES.success) {
      let user = await userController.getUserById(req.session.user.userId);
      res.render('profile', { title: 'Time 4 Trivia', user: user, msg: 'Profile updated' });
    } else {
      res.render('profile', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.user.isAdmin, error: 'Profile failed to update' });
    }
  }
});

router.post('/updatePassword', async function (req, res, next) {
  let current = req.body.currentPassword;
  let new1 = req.body.newPassword;
  let new2 = req.body.confirmPassword;

  if (new1 != new2) {
    res.render('profile', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.user.isAdmin, pwdError: 'Password do not match' });
  } else {
    let result = await userController.updateUserPassword(req.session.user.userId, current, new1, new2);
    if (result.status == STATUS_CODES.success) {
      res.redirect('/u/login');
    } else {
      res.render('profile', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.session.user.isAdmin, pwdError: 'Password update failed' });
    }
  }
});

module.exports = router;
