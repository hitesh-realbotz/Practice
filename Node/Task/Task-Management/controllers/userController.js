const User = require('../models/user');
const Jwt = require('jsonwebtoken');
const jwtKey = 'task-management';

const connection = require('../configuration/db-connection');
const { validateFields } = require('../utils/validation');

const registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const data = { email, password };
        const validationResp = validateFields(data);
        console.log("Validate Form ", validationResp.length ? validationResp : 'Ok');
        if (validationResp.length) {
            reject({ errors: validationResp });
        } else {
            connection.query("INSERT INTO users SET ?", data, (error, results, fields) => {
                console.log("controller => ", results);
                if (results && results.affectedRows) {
                    Jwt.sign({ email }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                        if (err) {
                            console.log("controller err => ", err);
                            reject({ errors: ["Something went wrong"] });
                        }
                        console.log("controller => ", { email, auth: token });
                        resolve({ email, auth: token });

                    })
                }else{
                    reject({ errors: `${error}` });
                }
            });
        }

        

    })
}
const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const data = { email, password };
        const validationResp = validateFields(data);
        if (validationResp.length) {
            reject({ errors: validationResp });
        } else {
            const columns = ['email'];
            connection.query("SELECT ?? FROM ?? WHERE email = ? AND password = ? ", [columns, 'users', email, password], (error, results, fields) => {
                if (results.length) {
                    Jwt.sign({ email }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                        if (err) {
                            console.log("controller err => ", err);
                            reject({ errors: ["Something went wrong"] });
                        }
                        resolve({ email, auth: token });

                    })
                }else{
                    reject({ errors: `${error ? error : 'User not found!'}` });
                }
            });
        }
    })
}


module.exports = { registerUser, loginUser }