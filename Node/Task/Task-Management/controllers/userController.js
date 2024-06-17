const User = require('../models/user');
const Jwt = require('jsonwebtoken');
const { JWT_KEY, EXPIRES_IN } = require('../configuration/authentication');
const { connection, USERS_TABLE_NAME } = require('../configuration/db-connection');

//Registers new user
const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const data = { email, password };
        connection.query("INSERT INTO ?? SET ?", [ USERS_TABLE_NAME,data], (error, results, fields) => {
            if (results && results.affectedRows) {
                Jwt.sign({ email }, JWT_KEY, { expiresIn: EXPIRES_IN }, (err, token) => {
                    if (err) {
                        reject({ errors: ["Something went wrong"] });
                    }
                    resolve({ email, auth: token });
                })
            } else {
                reject({ errors: `${error}` });
            }
        });
    })
}

//Login user
const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const columns = ['email'];
        connection.query("SELECT ?? FROM ?? WHERE email = ? AND password = ? ", [columns, USERS_TABLE_NAME, email, password], (error, results, fields) => {
            if (results.length) {
                Jwt.sign({ email }, JWT_KEY, { expiresIn: EXPIRES_IN }, (err, token) => {
                    if (err) {
                        reject({ errors: ["Something went wrong"] });
                    }
                    resolve({ email, auth: token });
                })
            } else {
                reject({ errors: `${error ? error : 'User not found!'}` });
            }
        });
    })
}


module.exports = { registerUser, loginUser }