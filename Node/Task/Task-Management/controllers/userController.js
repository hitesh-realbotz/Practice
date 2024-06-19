const User = require('../models/user');
const Jwt = require('jsonwebtoken');
const { connection, USERS_TABLE_NAME } = require('../configuration/db-connection');
const {encode} = require('js-base64');
require('dotenv').config();


//Registers new user
const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const encodedPassword = encode(password);
        const data = { email, password: encodedPassword };
        connection.query("INSERT INTO ?? SET ?", [ USERS_TABLE_NAME,data], (error, results, fields) => {
            if (results && results.affectedRows) {
                // const jwtData = {email, userId: results.insertId};
                Jwt.sign({email, userId: results.insertId}, process.env.JWT_KEY, { expiresIn: process.env.EXPIRES_IN }, (err, token) => {
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
        const encodedPassword = encode(password);
        const columns = ['userId','email'];
        connection.query("SELECT ?? FROM ?? WHERE email = ? AND password = ? ", [columns, USERS_TABLE_NAME, email, encodedPassword], (error, results, fields) => {
            if (results.length) {
                console.log(results);
                Jwt.sign({email, userId: results[0].userId}, process.env.JWT_KEY, { expiresIn: process.env.EXPIRES_IN }, (err, token) => {
                    if (err) {
                        console.log(error);
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