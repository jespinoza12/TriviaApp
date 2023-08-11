const bcrypt = require('bcrypt')
const sqlDAL = require('../data/sqlDAL');
const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;

exports.demoteUser = async function (userId) {
    return await sqlDAL.demoteUser(userId);
}

exports.promoteUser = async function (userId) {
    return await sqlDAL.promoteUser(userId);
}

exports.disableUser = async function (userId) {
    return await sqlDAL.disableUser(userId);
}

exports.enableUser = async function (userId) {
    return await sqlDAL.enableUser(userId);
}

exports.getUsers = async function (role = 'user') {
    let results = await sqlDAL.getUsersByRole(role);
    return results;
}

exports.createUser = async function (username, email, firstName, lastName, password) {
    let hashedPassword = await bcrypt.hash(password, 10);
    let result = await sqlDAL.createUser(username, hashedPassword, email, firstName, lastName);
    return result;
}

exports.updateProfile = async function (userId, firstName, lastName) {
    let user = await sqlDAL.getUserById(userId);

    if (!user) {
        return new Result(STATUS_CODES.failure, message = 'User not found.');
    }

    return await sqlDAL.updateProfile(userId, firstName, lastName);
}

exports.updateUserPassword = async function (userId, currentPassword, newPassword, confirmNewPassword) {
    if (newPassword != confirmNewPassword) {
        return { status: 'Failure', message: 'Entered passwords do not match' }
    }

    let hashedNewPassword = await bcrypt.hash(newPassword, 10);

    let user = await sqlDAL.getUserById(userId);

    if (!user) {
        return new Result(STATUS_CODES.failure, message = 'User not found.');
    }

    let passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) {
        return new Result(STATUS_CODES.failure, 'Current password is invalid');
    }

    return await sqlDAL.updateUserPassword(userId, hashedNewPassword);
}

exports.login = async function (username, password) {
    let user = await sqlDAL.getUserByUsername(username);

    if (!user) return new Result(STATUS_CODES.failure, 'Invalid Login.');

    // Check if user is disabled
    if (user.disabledStatus) {
        return new Result(STATUS_CODES.failure, 'User is disabled.');
    }

    let passwordsMatch = await bcrypt.compare(password, user.password); 

    if (passwordsMatch) {
        return new Result(STATUS_CODES.success, 'Valid Login.', user);
    } else {
        return new Result(STATUS_CODES.failure, 'Invalid Login.');
    }
}

exports.getUserById = function (userId) {
    return sqlDAL.getUserById(userId);
}

exports.deleteUserById = function (userId) {
    return sqlDAL.deleteUserById(userId);
}