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

exports.disableUser = async function (userId) {
    const con = await mysql.createConnection(sqlConfig);

    try {
        const sql = `INSERT INTO DisabledUsers (UserId, DisabledStatus) 
                    VALUES (?, true)
                    ON DUPLICATE KEY UPDATE DisabledStatus = true;`;
        await con.query(sql, [userId]);
        console.log(`User ${userId} disabled`);
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}

exports.enableUser = async function (userId) {
    const con = await mysql.createConnection(sqlConfig);

    try {
        const sql = `INSERT INTO DisabledUsers (UserId, DisabledStatus) 
                    VALUES (?, false)
                    ON DUPLICATE KEY UPDATE DisabledStatus = false;`;
        await con.query(sql, [userId]);

        console.log(`User ${userId} enabled`);
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}

exports.promoteUser = async function (userId) {
    const con = await mysql.createConnection(sqlConfig);

    try {
        const checkSql = `SELECT UserId FROM UserRoles 
                        WHERE UserId = ? AND RoleId = 2;`;
        const [results, ] = await con.query(checkSql, [userId]);

        if (results.length === 0) {
            const updateSql = `UPDATE UserRoles 
                            SET RoleId = 2 
                            WHERE UserId = ?;`;
            await con.query(updateSql, [userId]);
            console.log(`User ${userId} promoted to Admin`);
        } else {
            console.log(`User ${userId} is already an Admin`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}


exports.demoteUser = async function (userId) {
    const con = await mysql.createConnection(sqlConfig);

    try {
        let sql = `UPDATE UserRoles SET RoleId = 1 WHERE UserId = ${userId} AND RoleId = 2;`; // Assuming RoleId 2 is for Admin role
        await con.query(sql);

        console.log(`User ${userId} demoted from Admin`);
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}


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
        const checkSql = `SELECT * FROM LeaderBoard WHERE UserId = ?;`;
        const [existingUserRows, ] = await con.query(checkSql, [userId]);

        if (existingUserRows.length > 0) {
            const updateSql = `UPDATE LeaderBoard SET Score = ? WHERE UserId = ?`;
            await con.query(updateSql, [score, userId]);

            console.log(`User ${userId} updated in LeaderBoard with score ${score}`);
        } else {
            const insertSql = `INSERT INTO LeaderBoard (UserId, Score) VALUES (?, ?);`;
            await con.query(insertSql, [userId, score]);

            console.log(`User ${userId} added to LeaderBoard with score ${score}`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }
}

exports.createQuestion = async function (question, answers) {
    let result = new Result(STATUS_CODES.success, null);

    const con = await mysql.createConnection(sqlConfig);

    try {
        const insertQuestionSql = `INSERT INTO Questions (Question) VALUES (?);`;
        const [questionResult, ] = await con.query(insertQuestionSql, [question]);
        const questionId = questionResult.insertId;

        for (const answer of answers) {
            const insertAnswerSql = `INSERT INTO Answers (QuestionId, Answer, Correct) VALUES (?, ?, ?);`;
            await con.query(insertAnswerSql, [questionId, answer.answer, answer.Correct]);
        }

    } catch (err) {
        console.log(err);
        result.status = STATUS_CODES.error;
    } finally {
        con.end();
    }
}

exports.getQuestions = async function () {
    let questions = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectQuestionsSql = `SELECT * FROM Questions;`;
        const [questionResults, ] = await con.query(selectQuestionsSql);

        for (const question of questionResults) {
            const selectAnswersSql = `SELECT * FROM Answers WHERE QuestionId = ?;`;
            const [answerResults, ] = await con.query(selectAnswersSql, [question.QuestionId]);

            const answers = [];
            for (const answer of answerResults) {
                answers.push({ answer: answer.Answer, Correct: answer.Correct });
            }

            questions.push(new Question(question.QuestionId, question.Question, answers));
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return questions;
}


exports.getAllUsers = async function () {
    const users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectUsersSql = `SELECT * FROM Users;`;
        const [userResults, ] = await con.query(selectUsersSql);

        for (const user of userResults) {
            const selectRolesSql = `SELECT UserId, Role FROM UserRoles ur JOIN Roles r ON ur.roleid = r.roleid WHERE ur.UserId = ?`;
            const [roleResults, ] = await con.query(selectRolesSql, [user.UserId]);

            const roles = [];
            for (const role of roleResults) {
                roles.push(role.Role);
            }

            users.push(new User(user.UserId, user.Username, user.Email, user.FirstName, user.LastName, user.Password, roles));
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return users;
}

exports.getUsersByRole = async function (role) {
    const users = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectUsersSql = `SELECT * FROM Users u JOIN UserRoles ur ON u.userid = ur.userId JOIN Roles r ON ur.roleId = r.roleId WHERE r.role = ?`;

        const [userResults, ] = await con.query(selectUsersSql, [role]);

        for (const user of userResults) {
            const selectRolesSql = `SELECT UserId, Role FROM UserRoles ur JOIN Roles r ON ur.roleid = r.roleid WHERE ur.UserId = ?`;
            const [roleResults, ] = await con.query(selectRolesSql, [user.UserId]);

            const roles = [];
            for (const role of roleResults) {
                roles.push(role.Role);
            }

            const disabledStatus = await exports.checkIfUserDisabled(user.UserId);

            users.push(new User(user.UserId, user.Username, user.Email, user.FirstName, user.LastName, user.Password, roles, disabledStatus));
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return users;
}

exports.getUserById = async function (userId) {
    let user = null;

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectUserSql = `SELECT * FROM Users WHERE UserId = ?`;
        const [userResults, ] = await con.query(selectUserSql, [userId]);

        for (const userRow of userResults) {
            const selectRolesSql = `SELECT UserId, Role FROM UserRoles ur JOIN Roles r ON ur.roleid = r.roleid WHERE ur.UserId = ?`;
            const [roleResults, ] = await con.query(selectRolesSql, [userRow.UserId]);

            const roles = [];
            for (const role of roleResults) {
                roles.push(role.Role);
            }
            user = new User(userRow.UserId, userRow.Username, userRow.Email, userRow.FirstName, userRow.LastName, userRow.Password, roles);
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return user;
}

exports.deleteUserById = async function (userId) {
    const result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        const deleteUserRolesSql = `DELETE FROM UserRoles WHERE UserId = ?`;
        await con.query(deleteUserRolesSql, [userId]);

        const deleteDisabledUserSql = `DELETE FROM DisabledUsers WHERE UserId = ?`;
        await con.query(deleteDisabledUserSql, [userId]);

        const deleteUserSql = `DELETE FROM Users WHERE UserId = ?`;
        await con.query(deleteUserSql, [userId]);

        result.status = STATUS_CODES.success;
        result.message = `User ${userId} deleted!`;
    } catch (err) {
        console.log(err);
        result.status = STATUS_CODES.failure;
        result.message = err.message;
    } finally {
        con.end();
    }

    return result;
}

exports.checkIfUserDisabled = async function (userId) {
    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectDisabledStatusSql = `SELECT DisabledStatus FROM DisabledUsers WHERE UserId = ?;`;
        const [results, ] = await con.query(selectDisabledStatusSql, [userId]);

        if (results.length > 0) {
            const disabledStatus = results[0].DisabledStatus;
            return disabledStatus === 1;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        con.end();
    }
}

exports.getUserByUsername = async function (username) {
    let user = null;

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectUserSql = `SELECT * FROM Users WHERE Username = ?`;
        console.log(selectUserSql);
        
        const [userResults, ] = await con.query(selectUserSql, [username]);

        for (const userRow of userResults) {
            const selectRolesSql = `SELECT UserId, Role FROM UserRoles ur JOIN Roles r ON ur.roleid = r.roleid WHERE ur.UserId = ?`;
            console.log(selectRolesSql);
            const [roleResults, ] = await con.query(selectRolesSql, [userRow.UserId]);

            const roles = [];
            for (const role of roleResults) {
                roles.push(role.Role);
            }

            const disabledStatus = await exports.checkIfUserDisabled(userRow.UserId);

            user = new User(userRow.UserId, userRow.Username, userRow.Email, userRow.FirstName, userRow.LastName, userRow.Password, roles, disabledStatus);
            console.log("user: ", user)
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return user;
}

exports.getRolesByUserId = async function (userId) {
    const roles = [];

    const con = await mysql.createConnection(sqlConfig);

    try {
        const selectRolesSql = `SELECT UserId, Role FROM UserRoles ur JOIN Roles r ON ur.roleid = r.roleid WHERE UserId = ?`;
        console.log(selectRolesSql);

        const [roleResults, ] = await con.query(selectRolesSql, [userId]);

        for (const role of roleResults) {
            roles.push(role.Role);
        }
    } catch (err) {
        console.log(err);
    } finally {
        con.end();
    }

    return roles;
}

exports.createUser = async function (username, hashedPassword, email, firstName, lastName) {
    const result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        const insertUserSql = `INSERT INTO Users (Username, Email, Password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)`;
        const userResult = await con.query(insertUserSql, [username, email, hashedPassword, firstName, lastName]);

        const newUserId = userResult[0].insertId;

        const insertUserRoleSql = `INSERT INTO UserRoles (UserId, RoleId) VALUES (?, 1)`;
        await con.query(insertUserRoleSql, [newUserId]);

        result.status = STATUS_CODES.success;
        result.message = 'Account Created with User Id: ' + newUserId;
        result.data = newUserId;
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    } finally {
        con.end();
    }
}

exports.updateUserPassword = async function (userId, hashedPassword) {
    const result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        const updatePasswordSql = `UPDATE Users SET Password = ? WHERE UserId = ?`;
        const userResult = await con.query(updatePasswordSql, [hashedPassword, userId]);

        result.status = STATUS_CODES.success;
        result.message = 'Password updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    } finally {
        con.end();
    }
}

exports.updateProfile = async function (userId, firstName, lastName) {
    const result = new Result();

    const con = await mysql.createConnection(sqlConfig);

    try {
        const updateProfileSql = `UPDATE Users SET FirstName = ?, LastName = ? WHERE UserId = ?`;
        const userResult = await con.query(updateProfileSql, [firstName, lastName, userId]);

        result.status = STATUS_CODES.success;
        result.message = 'Profile updated';
        return result;
    } catch (err) {
        console.log(err);

        result.status = STATUS_CODES.failure;
        result.message = err.message;
        return result;
    } finally {
        con.end();
    }
}
