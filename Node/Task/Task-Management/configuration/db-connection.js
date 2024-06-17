const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"password",
    database:"task_management"
});

connection.connect((err)=>{
    if(err)
    {
        console.warn("error in connection")
    }
});

const TASKS_TABLE_NAME = "tasks";
const USERS_TABLE_NAME = "users";

module.exports = {connection, TASKS_TABLE_NAME, USERS_TABLE_NAME};