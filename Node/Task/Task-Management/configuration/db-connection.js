const mysql = require('mysql2');

const connection= mysql.createConnection({
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

module.exports = connection;