const sqlDAL = require('../data/sqlDAL');

const Question = require('../models/question');
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

/**
 * 
 * @returns an array of user models
 */
exports.getQuestions = async function () {
    let results = await sqlDAL.getQuestions();
    console.log(results)
    return results;
}

exports.createQuestion = async function (question, category, difficulty, correctAnswer, incorrectAnswers) {
    const questionPattern = /^[A-Za-z?]+$/;
    const answerPattern = /^[A-Za-z.]+$/;
    const difficultyPattern = /^Easy|Medium|Hard$/;
    const categoryPattern = '';
    if (questionPattern.test() == false | answerPattern.test() == false | difficultyPattern.test() == false | categoryPattern.test() == false){
        return { status: 'Failure', message: 'Invalid question data.' }
    }
    let result = await sqlDAL.createQuestion(question, category, difficulty, correctAnswer, incorrectAnswers);
    console.log(result);
    return result;
}

/**
 *
 * @param {*}
 * @returns retrieves questions that have not been approved yet
 */
exports.getPendingQuestions =  function () {
    let results = sqlDAL.getPendingQuestions();
    console.log(results)
    return results;
}

/**
 *
 * @param {*} questionId
 * @returns approves question matching questionId and makes it a playable question
 */
exports.approveQuestion = async function (questionId) {
    return sqlDAL.approveQuestion(questionId);
}
/**
 *
 * @param {*} questionId
 * @returns deletes the question matching the questionId
 */
exports.deleteQuestion= function (questionId) {
    return sqlDAL.deleteQuestion(questionId);
}