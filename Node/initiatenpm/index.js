const moment = require("moment");
const express = require("express");

const time = new Date();
const parsedTime = moment(time).format("h:mm:ss");
console.log("parsedTime : ", parsedTime);

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    res.send("Hello from express Get Route!");  
});
