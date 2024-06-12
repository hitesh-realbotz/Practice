const express = require("express");
const con = require("./config");
// const mysql= require("mysql2");
// const con= mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"password",
//   database:"world"
// });
// con.connect((error)=>{
//   if(error)
//   {
//     console.warn("not connect")
//     console.warn(error);
//   }else{
//     console.warn("connected!!!")
//   }
// });

const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
    con.query("select * from users", (err, result) => {
        if (err) { resp.send("error in api") }
        else { resp.send(result) }
    })
});

app.post("/", (req, resp) => {
    const data = req.body;
    con.query("INSERT INTO users SET ?", data, (error, results, fields) => {
        if (error) throw error;
        resp.send(results)
    })
});

app.put("/:id",(req,resp)=>{
    const data= [req.body.name,req.body.password,req.body.user_type,req.params.id];
    con.query("UPDATE users SET name = ?, password = ?, user_type = ? WHERE id = ?",
    data,(error,results,fields)=>{
      if(error) throw error;
      resp.send(results)
    })
  });

app.delete("/:id",(req,resp)=>{
    const data= [req.params.id];
    con.query("delete from users WHERE id = ?",
    data,(error,results,fields)=>{
      if(error) throw error;
      resp.send(results)
    })
  });
  

app.listen("5000")