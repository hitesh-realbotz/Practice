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


// // //Async
// let a=20;
// let b=0;

// setTimeout(()=>{
//    b=30;
// },2000)
// console.log(a+b);


// const express = require('express');
// const app = express();

// app.get("", (req, resp) => {
//     resp.send(`
//     <h1>Welcome to Home page</h1>
//     <a href="/about">Go to About page</a>
//     `);
// });
// app.get("/about", (req, resp) => {
//     resp.send(`
//     <input type="text" placeholder="user name" value="${req.query.name}"  />
//     <button>Click</button>
//     <a href="/">Go to Home page</a>
//     `);
// });
// app.get("/help", (req, resp) => {
//     resp.send([
//         {
//             name:'Peter',
//             email:'peter@test.com'
//         },
//         {
//             name:'Bruce',
//             email:'bruce@test.com'
//         }
//     ]);
// });
// app.listen(5000);


// const express = require('express');
// const path = require('path');
// const app = express();
// const publicPath=path.join(__dirname,'public')
// app.use(express.static(publicPath));
// app.listen(5000);


// const express = require('express');
// const path = require('path');
// const app = express();
// const publicPath=path.join(__dirname,'public')

// app.get("", (req, resp) => {
//     resp.sendFile(`${publicPath}/index.html`)
// });
// app.get("/about", (req, resp) => {
//     resp.sendFile(`${publicPath}/about.html`)
// });
// app.get("/help", (req, resp) => {
//     resp.sendFile(`${publicPath}/help.html`)
// });

// app.set('view engine','ejs');
// app.get('/profile',(_,resp)=>{
//    const user={
//       name:'Peter',
//       email:'peter@test.com',
//       country:'USA'
//    }
//    resp.render('profile',{user})
// });

// app.get('/login', (req, resp) => {
//    resp.render("login");
// })


// app.get("*", (req, resp) => {
//     resp.sendFile(`${publicPath}/nopage.html`)
// });
// app.listen(5000);


// //Application level middleware
// const express = require('express');
// const app = express();
// const reqFilter = (req, resp, next) => {
//    console.log("reqFilter");
//    if (!req.query.age) {
//       resp.send("Please provide your age")
//    }
//    else if (req.query.age < 18) {
//       resp.send("You are under aged")
//    }
//    else {
//       next();
//    }
// }
// app.use(reqFilter);

// app.get('/', (res, resp) => {
//    resp.send('Welcome to Home page')
// });

// app.get('/users', (res, resp) => {
//    resp.send('Welcome to Users page')
// });
// app.get('/about', (res, resp) => {
//    resp.send('Welcome to About page')
// });
// app.listen(5000);



// //Route level middleware
// const express = require('express');
// const app = express();
// const reqFilter = require('./middleware')
// // const reqFilter = (req, resp, next) => {
// //    console.log("reqFilter");
// //    if (!req.query.age) {
// //       resp.send("Please provide your age")
// //    }
// //    else if (req.query.age < 18) {
// //       resp.send("You are under aged")
// //    }
// //    else {
// //       next();
// //    }
// // }



//Route level middleware
const express = require('express');
const app = express();
const reqFilter = require('./middleware')
// const reqFilter = (req, resp, next) => {
//    console.log("reqFilter");
//    if (!req.query.age) {
//       resp.send("Please provide your age")
//    }
//    else if (req.query.age < 18) {
//       resp.send("You are under aged")
//    }
//    else {
//       next();
//    }
// }
const route = express.Router();
route.use(reqFilter);

app.get('/', (res, resp) => {
   resp.send('Welcome to Home page')
});

route.get('/users',  (res, resp) => {
   resp.send('Welcome to Users page')
});
route.get('/contact',  (res, resp) => {
   resp.send('Welcome to Contact page')
});
app.get('/about', (res, resp) => {
   resp.send('Welcome to About page')
});

app.use("/", route);

app.listen(5000);
