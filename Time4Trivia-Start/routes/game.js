const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.get('/play', function(req, res, next) {
  // TODO: Implement Game
  
  if (!req.session.user) {
    res.redirect('/u/login');
  }else if (req.session.user) {
    res.render('play', {user: req.session.user});
    console.log(questionController.getQuestions());
    console.log(questionController.getAnswers());
  }
});

module.exports = router;