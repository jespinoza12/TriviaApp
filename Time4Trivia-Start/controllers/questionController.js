const sqlDAL = require('../data/sqlDAL');

const Question = require('../models/question');
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

/**
 * 
 * @returns an array of user models
 */

exports.getLeaderboard = async function () {
    let results = await sqlDAL.getLeaderboard();
    console.log(results)
    return results;
}

exports.addToLeaderBoard = async function (userId, score) {
    let result = await sqlDAL.addToLeaderBoard(userId, score);
    console.log(result);
    return result;
}

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

