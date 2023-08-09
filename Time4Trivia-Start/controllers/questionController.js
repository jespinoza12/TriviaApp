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

exports.createQuestion = async function (question, answers) {
    let result = await sqlDAL.createQuestion(question, answers);
    console.log(result);
    return result;
}

// /**
//  *
//  * @param {*}
//  * @returns retrieves questions that have not been approved yet
//  */
// exports.getPendingQuestions= function (questionId) {
//     return sqlDAL.getPendingQuestions(questionId);
// }
// /**
//  *
//  * @param {*} questionId
//  * @returns approves question matching questionId and makes it a playable question
//  */
// exports.approveQuestion= function (questionId) {
//     return sqlDAL.approveQuestion(questionId);
// }
// /**
//  *
//  * @param {*} questionId
//  * @returns deletes the question matching the questionId
//  */
// exports.deleteQuestion= function (questionId) {
//     return sqlDAL.deleteQuestion(questionId);
// }