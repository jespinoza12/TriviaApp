const express = require('express');
const router = express.Router();


router.get('/play', function(req, res, next) {
  // TODO: Implement Game
  if (!req.session.user) {
    res.redirect('/u/login');
  }else if (req.session.user) {
    res.render('play', {user: req.session.user});
  }
});

module.exports = router;