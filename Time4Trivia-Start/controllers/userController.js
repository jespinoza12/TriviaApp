const bcrypt = require('bcrypt')
const sqlDAL = require('../data/sqlDAL');

const Result = require('../models/result').Result;
const STATUS_CODES = require('../models/statusCodes').STATUS_CODES;



const emailPattern = /^([a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6})*$/;
const textPattern = /^[a-zA-Z0-9]{3,16}$/;
const namePattern = /^[A-Za-z]{3,25}$/;

/**
 * 
 * @returns an array of user models
 */
exports.getUsers = async function (role = 'user') {
    let results = await sqlDAL.getUsersByRole(role);
    // console.log('getUsers');
    // console.log(results);
    return results;
}

exports.getUsersByRole = async function (role) {
    const rolePattern = /^user|admin$/;
    if (rolePattern.test() == false){
        return { status: 'Failure', message: 'Please enter a valid role' }
    }
    let results = await sqlDAL.getUsersByRole(role);
    return results;
}
/**
 * 
 * @param {*} username 
 * @param {*} email 
 * @param {*} firstName 
 * @param {*} lastName 
 * @param {*} password 
 * @returns a Result with status/message and the new user id as data
 */
exports.createUser = async function (username, email, firstName, lastName, password) {

    if (emailPattern.test(email) == false) {
        return { status: 'Failure', message: 'Invalid email' }
    } if (namePattern.test(firstName) == false) {
        return { status: 'Failure', message: 'Invalid name' }
    } if (namePattern.test(lastName) == false) {
        return { status: 'Failure', message: 'Invalid name' }
    } if (textPattern.test(username) == false) {
        return { status: 'Failure', message: 'Invalid username' }
    } if (textPattern.test(password) == false) {
        return { status: 'Failure', message: 'Invalid password' }
    }
    let result = await sqlDAL.createUser(username, hashedPassword, email, firstName, lastName);
    return result;
}

/**
 * 
 * @param {*} userId 
 * @param {*} firstName 
 * @param {*} lastName
 * @returns The result of the update with status/message
 */
exports.updateProfile = async function (userId, firstName, lastName) {
    let user = await sqlDAL.getUserById(userId);
    // If we couldn't find the user
    if (!user) {
        return new Result(STATUS_CODES.failure, message = 'User not found.');
    }
    if (namePattern.test(firstName) == false | namePattern.test(lastName) == false){
        return { status: 'Failure', message: 'Please enter a valid name' }
    }
    return await sqlDAL.updateProfile(userId, firstName, lastName);
}

/**
 * @param {*} userId 
 * @param {*} currentPassword 
 * @param {*} newPassword 
 * @param {*} confirmNewPassword 
 * @returns The result of the update with status/message
 */
exports.updateUserPassword = async function (userId, currentPassword, newPassword, confirmNewPassword) {
    // If new passwords don't match
    if (textPattern.test(newPassword) == false){
        return { status: 'Failure', message: 'Please enter a valid password' }
    }
    if (newPassword != confirmNewPassword) {
        return { status: 'Failure', message: 'Entered passwords do not match' }
    } 

    let hashedNewPassword = await bcrypt.hash(newPassword, 10);

    let user = await sqlDAL.getUserById(userId);
    // console.log(user);

    // If we couldn't find the user
    if (!user) {
        return new Result(STATUS_CODES.failure, message = 'User not found.');
    }

    // Make sure the actual password matches the one the user gave us
    let passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) {
        return new Result(STATUS_CODES.failure, 'Current password is invalid');
    }

    return await sqlDAL.updateUserPassword(userId, hashedNewPassword);
}

/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns The result of the login attempt
 */
exports.login = async function (username, password) {
    // console.log(`Logging in with username ${username}`);
    if (textPattern.test(username) == false) {
        return { status: 'Failure', message: 'Invalid username' }
    }
    // Get User by Username
    let user = await sqlDAL.getUserByUsername(username);

    if (!user) return new Result(STATUS_CODES.failure, 'Invalid Login.');

    let passwordsMatch = await bcrypt.compare(password, user.password); // does the given password match the user's hashed password?

    if (passwordsMatch && textPattern.test(password) == true) {
        // console.log('Successful login for ' + username);
        // console.log(user);
        return new Result(STATUS_CODES.success, 'Valid Login.', user);
    } else {
        return new Result(STATUS_CODES.failure, 'Invalid Login.');
    }
}

/**
 * 
 * @param {*} userId 
 * @returns the matching user model or null
 */
exports.getUserById = function (userId) {
    return sqlDAL.getUserById(userId);
}

/**
 * 
 * @param {*} userId 
 * @returns the matching user model or null
 */



/**
 * 
 * @param {*} userId 
 * @returns deletes the user matching the userId
 */
exports.deleteUserById = function (userId) {
    return sqlDAL.deleteUserById(userId);
}
