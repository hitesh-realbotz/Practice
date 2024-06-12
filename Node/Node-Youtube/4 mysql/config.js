const mysql = require("mysql2");
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"test"
});

con.connect((err)=>{
    if(err)
    {
        console.warn("error in connection")
    }
});

module.exports = con;