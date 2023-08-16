const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/play', async function(req, res, next) {
  try {
    if (!req.session.user) {
      res.redirect('/u/login');
    } else {
      const questions = await questionController.getQuestions();
      const shuffledQuestions = shuffleArray(questions).slice(0, 10);
      res.render('play', {
        user: req.session.user,
        isAdmin: req.session.user.isAdmin,
        title: 'Time 4 Trivia',
        questions: shuffledQuestions
      });

    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/submitAnswers', async function(req, res, next) {
  try {
    if (!req.session.user) {
      return res.redirect('/u/login');
    }

    const questions = await questionController.getQuestions();
    const userAnswers = {};
    for (const question of questions) {
      const selectedAnswer = req.body[`answer_${question.questionId}`];
      userAnswers[question.questionId] = selectedAnswer;
    }
    let score = 0;

    req.session.userProgress = [];

    for (const question of questions) {
      const correctAnswer = question.answers.find(answer => answer.Correct === 1);
      const userAnswer = userAnswers[question.questionId];
      const isCorrect = userAnswer === correctAnswer.answer;

      if (isCorrect) {
        score++;
      }

      req.session.userProgress.push({
        question: question.question,
        userAnswer,
        correctAnswer: correctAnswer.answer,
        isCorrect
      });
    }

    await questionController.addToLeaderBoard(req.session.user.userId, score);

    const nextQuestionIndex = req.session.userProgress.length;
    if (nextQuestionIndex >= 10) {
      return res.redirect('/g/results');
    } else {
      return res.redirect('/g/play');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

router.get('/results', function(req, res, next) {
  try {
    if (!req.session.user || !req.session.userProgress) {
      return res.redirect('/');
    }
    const user = req.session.user;
    const userProgress = req.session.userProgress;
    const totalQuestions = 10;
    let score = 0;

    for (const progress of userProgress) {
      if (progress.isCorrect) {
        score++;
      }
    }

    req.session.userProgress = [];

    res.render('results', {
      user,
      score,
      totalQuestions,
      userProgress
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
