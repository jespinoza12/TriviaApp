const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', function(req, res, next) {
  console.log(req.session.user);
  console.log("/ cookies", req.cookies);
  res.render('index', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin });
});
router.get('/leaderboard', async function(req, res, next) {
  try {
    const leaders = await questionController.getLeaderBoard(); 

    const top10Leaders = leaders.sort((a, b) => b.Score - a.Score).slice(0, 10);

    res.render('leaderboard', { title: 'Time 4 Trivia', user: req.session.user, isAdmin: req.cookies.isAdmin, leaders: top10Leaders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;