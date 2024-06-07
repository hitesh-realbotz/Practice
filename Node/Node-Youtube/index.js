// const fs = require("fs");
// fs.writeFileSync("file.txt","This is file data.");
// console.warn("=> ", __dirname);
// console.warn("=> ", __filename);

// const app = require('./app')
// console.log(app.xyz())

// let arr=[4,1,6,3,4,89,0];
// const result =arr.filter((item)=>{
//     return item>=4
// });
// console.warn(result);

// const colors = require('colors');
// console.warn("This is a sample Text".red.bgYellow);

// const chalk = require("chalk");
// console.log(chalk.red.bgYellow("Text by Chalk!"));


const http = require('http');
// http.createServer((req, resp) => {
//     resp.write("<h1>Code Step by step</h1>");
//     resp.end();
// }).listen(4500);

// const data = require('./data');
// http.createServer((req, resp) => {
//     resp.writeHead(500, { 'Content-Type': 'application\json' });
//     resp.write(JSON.stringify(data));
//     resp.end();
// }).listen(5000);


// const fs = require('fs');
// const input = process.argv;
// if(input[2]=='add')
// {
//     fs.writeFileSync(input[3],input[4])
// }
// else if(input[2]=='remove')
// {
//     fs.unlinkSync(input[3])
// }
// else
// {
//     console.log("invalid input ")
// }

// const fs = require('fs');
// const path = require('path');
// const dirPath = path.join(__dirname, 'files');
// console.log(dirPath)
// for(i=0;i<5;i++)
// {
//     fs.writeFileSync(`${dirPath}/hello${i}.txt`,"some simple text in file");
// }
// fs.readdir(dirPath, (err, files) => {
//     files.forEach((item) => {
//         console.warn("file name is : ", item)
//     });
// }
// );


// const fs = require('fs');
// const path = require('path');
// const dirPath= path.join(__dirname,'crud');
// const filePath = `${dirPath}/apple.txt`;
// //Create
// fs.writeFileSync(filePath,'this is a simple file');
// //Read
// fs.readFile(filePath,'utf8',(err,item)=>{
// console.log(item);
// });
// //Update
// fs.appendFile(filePath,' for fruits',(err)=>{
// if(!err) console.log("file is updated")
// })
// //Rename
// fs.rename(filePath, `${dirPath}/fruit.txt`,(err)=>{
// if(!err) console.log("file name is updated")
// })

// //Delete
// fs.unlinkSync(`${dirPath}/fruit.txt`);


// //Async
let a=20;
let b=0;

setTimeout(()=>{
   b=30;
},2000)
console.log(a+b)

