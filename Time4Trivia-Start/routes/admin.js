const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users/:role', async function (req, res, next) {
  let role = req.params.role;
  if (!req.session.user || !req.cookies.isAdmin) {
    res.redirect('/');
  } else {
    let users = await userController.getUsers(role);

    res.render('users', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, users: users });
  }
});

router.get('/admins/:role', async function (req, res, next) {
  let role = req.params.role;
  if (!req.session.user || !req.cookies.isAdmin) {
    res.redirect('/');
  } else {
    let users = await userController.getUsers(role);

    res.render('admins', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, users: users });
  }
});

router.post('/users/delete/:userId', async function (req, res, next) {
  let userId = req.params.userId;

  await userController.deleteUserById(userId);

  res.redirect('/a/users/user');
});

router.post('/users/promote/:userId', async function (req, res, next) {
  let userId = req.params.userId;
  await userController.promoteUser(userId); 
  res.redirect('/a/users/user');
});

router.post('/admins/demote/:userId', async function (req, res, next) {
  let userId = req.params.userId;
  if (req.session.user.userId == userId) {
    res.redirect('/a/admins/admin');
    console.log('Cannot demote yourself');
  }else {
    await userController.demoteUser(userId); 
    res.redirect('/a/admins/admin');
  }
});

router.post('/users/disable/:userId', async function (req, res, next) {
  let userId = req.params.userId;

  await userController.disableUser(userId);

  res.redirect('/a/users/user');
});

router.post('/users/enable/:userId', async function (req, res, next) {
  let userId = req.params.userId;

  await userController.enableUser(userId);

  res.redirect('/a/users/user');
});
module.exports = router;
