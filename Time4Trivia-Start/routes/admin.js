const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const requireAdmin = (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect('/');
  }
  console.log("User is Admin")
  next();
};

router.get('/users/:role', requireAdmin, async function (req, res, next) {
  let role = req.params.role;
  let users = await userController.getUsers(role);

  res.render('users', { title: 'Time 4 Trivia', user: req.session.user, users: users, isAdmin: req.session.user.isAdmin });
});

router.get('/admins/:role', requireAdmin, async function (req, res, next) {
  let role = req.params.role;
  let users = await userController.getUsers(role);

  res.render('admins', { title: 'Time 4 Trivia', user: req.session.user, users: users, isAdmin: req.session.user.isAdmin });
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
