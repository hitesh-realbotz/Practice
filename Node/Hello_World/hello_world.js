const fs = require("fs");
// const sh = require("superheroes");
const chalk = require("chalk");

console.log("Hello...This is Node tutorial!");
console.log(chalk.red("Text by Chalk!"));
fs.writeFileSync("file.txt","This is file data.");
fs.appendFileSync("file.txt", "Appended content!");

// console.log(sh.random());
