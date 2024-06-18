const Jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, resp, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, process.env.JWT_KEY, (err, valid)=>{
            if (err) {
                resp.status(401).json({Error : "Provide valid token"});
            } else {
                console.log("Auth Middleware ", valid.userId);
                process.env.loggedInUserId = valid.userId;
                next();
            }
        })
    } else {
        resp.status(401).json({Error : "Add token with header"});
    }
}
