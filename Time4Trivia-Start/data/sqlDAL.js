// sqlDAL is responsible to for all interactions with mysql for Membership
const User = require('../models/user').User;
const Result = require('../models/result').Result;
const Question = require('../models/question').Question;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;
const dotenv = require('dotenv').config();

const { json } = require('express');
const mysql = require('mysql2/promise');
const sqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
};

exports.getLeaderBoard = async function () {
    let leaderBoard = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `
            SELECT l.Score, u.Username
            FROM LeaderBoard l
            JOIN Users u ON l.UserId = u.UserId
            ORDER BY l.Score DESC;
        `;
        
        const [leaderBoardResults, ] = await con.query(sql);
        leaderBoard = leaderBoardResults;

    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return leaderBoard;
}

exports.addToLeaderBoard = async function (userId, score) {
    const con = await mysql.createConnection(sqlConfig);
    try {
        let sql = `SELECT * FROM LeaderBoard WHERE UserId = ${userId};`;
        const [existingUserRows, ] = await con.query(sql);

        if (existingUserRows.length > 0) {
            sql = `UPDATE LeaderBoard SET Score = ${score} WHERE UserId = ${userId}`;
            await con.query(sql);

            console.log(`User ${userId} updated in LeaderBoard with score ${score}`);
        } else {
            sql = `INSERT INTO LeaderBoard (UserId, Score) VALUES (${userId}, ${score});`;
            await con.query(sql);

            console.log(`User ${userId} added to LeaderBoard with score ${score}`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}

exports.createQuestion = async function (question, answers) {
    //Create questions that has the question and with the answers insert for each answer in Answers table with the QuestionID, Answer, and IsCorrect which is true or false
    let result = new Result(STATUS_CODES.success, null);

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `insert into Questions (Question) values ('${question}');`;
        let [questionResult, ] = await con.query(sql);

        console.log(questionResult);

        let questionId = questionResult.insertId;

        for(key in answers){
            let answer = answers[key];
            let sql = `insert into Answers (QuestionId, Answer, Correct) values (${questionId}, '${answer.answer}', ${answer.Correct});`;
            let [answerResult, ] = await con.query(sql);
            console.log(answerResult);
        }
    }
    catch (err) {
        console.log(err);
        result.status = STATUS_CODES.error;
    }
    finally {
        con.end();
    }
}

exports.getQuestions = async function () {
    let questions = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Questions;`;
        const [questionResults, ] = await con.query(sql);

        for (key in questionResults) {
            let q = questionResults[key];
            let sql = `select * from Answers where QuestionId = ${q.QuestionId};`;
            const [answerResults, ] = await con.query(sql);

            let answers = [];
            for (key in answerResults) {
                let a = answerResults[key];
                answers.push({ answer: a.Answer, Correct: a.Correct });
            }

            questions.push(new Question(q.QuestionId, q.Question, answers));

            // Log the contents of the answers array for each question
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return questions;
}
/**
 * @returns and array of user models
 */
exports.getAllUsers = async function () {
    users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users;`;

        const [userResults, ] = await con.query(sql);

        // console.log('getAllUsers: user results');
        // console.log(userResults);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            console.log(sql);
            const [roleResults, ] = await con.query(sql);

            // console.log('getAllUsers: role results');
            // console.log(roleResults);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            users.push(new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles));
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return users;
}

/**
 * @returns and array of user models
 */
exports.getUsersByRole = async function (role) {
    users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users u join UserRoles ur on u.userid = ur.userId join Roles r on ur.roleId = r.roleId where r.role = '${role}'`;

        const [userResults, ] = await con.query(sql);

        // console.log('getAllUsers: user results');
        // console.log(userResults);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            console.log(sql);
            const [roleResults, ] = await con.query(sql);

            // console.log('getAllUsers: role results');
            // console.log(roleResults);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            users.push(new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles));
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return users;
}

/**
 * @param {*} userId the userId of the user to find
 * @returns a User model or null if not found
 */
exports.getUserById = async function (userId) {
    let user = null;

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users where UserId = ${userId}`;
        
        const [userResults, ] = await con.query(sql);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            console.log(sql);
            const [roleResults, ] = await con.query(sql);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            user = new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return user;
}

exports.deleteUserById = async function (userId) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `delete from UserRoles where UserId = ${userId}`;
        let result = await con.query(sql);
        // console.log(result);

        sql = `delete from Users where UserId = ${userId}`;
        result = await con.query(sql);
        // console.log(result);

        result.status = STATUS_CODES.success;
        result.message = `User ${userId} delted!`;
    } catch (err) {
        console.log(err);
        result.status = STATUS_CODES.failure;
        result.message = err.message;
    }finally{
        con.end();
    }

    return result;
}

/**
 * @param {*} username the username of the user to find
 * @returns a User model or null if not found
 */
exports.getUserByUsername = async function (username) {
    let user = null;

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select * from Users where Username = '${username}'`;
        console.log(sql);
        
        const [userResults, ] = await con.query(sql);

        for(key in userResults){
            let u = userResults[key];

            let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where ur.UserId = ${u.UserId}`;
            console.log(sql);
            const [roleResults, ] = await con.query(sql);

            let roles = [];
            for(key in roleResults){
                let role = roleResults[key];
                roles.push(role.Role);
            }
            user = new User(u.UserId, u.Username, u.Email, u.FirstName, u.LastName, u.Password, roles);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return user;
}

/**
 * @param {*} userId the userId of the user to find roles for
 * @returns an array of role names
 */
exports.getRolesByUserId = async function (userId) {
    results = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `select UserId, Role from UserRoles ur join Roles r on ur.roleid = r.roleid where UserId = ${userId}`;

        const [results, ] = await con.query(sql);

        for(key in results){
            let role = results[key];
            results.push(role.Role);
        }
    } catch (err) {
        console.log(err);
    }finally{
        con.end();
    }

    return results;
}

/**
 * @param {*} username 
 * @param {*} hashedPassword 
 * @param {*} email 
 * @returns a result object with status/message
 */
exports.createUser = async function (username, hashedPassword, email, firstName, lastName) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `insert into Users (Username, Email, Password, FirstName, LastName) values ('${username}', '${email}', '${hashedPassword}', '${firstName}', '${lastName}')`;
        const userResult = await con.query(sql);

        let newUserId = userResult[0].insertId;

        sql = `insert into UserRoles (UserId, RoleId) values (${newUserId}, 1)`;
        await con.query(sql);

        result.status = STATUS_CODES.success;
        result.message = 'Account Created with User Id: ' + newUserId;
        result.data = newUserId;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }finally{
        con.end();
    }
}

/**
 * 
 * @param {*} userId 
 * @param {*} hashedPassword 
 * @returns a result object with status/message
 */
exports.updateUserPassword = async function (userId, hashedPassword) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Users set password = '${hashedPassword}' where userId = '${userId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = 'Profile updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}

/**
 * 
 * @param {*} userId 
 * @param {*} firstName 
 * @param {*} lastName
 * @returns a result object with status/message
 */
exports.updateProfile = async function (userId, firstName, lastName) {
    let result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `update Users set firstName = '${firstName}', lastName = '${lastName}' where userId = '${userId}'`;
        const userResult = await con.query(sql);

        // console.log(r);
        result.status = STATUS_CODES.success;
        result.message = 'Profile updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    }
}