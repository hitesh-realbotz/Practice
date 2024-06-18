const Jwt = require('jsonwebtoken');
const { JWT_KEY } = require("./configuration/authentication");


module.exports = (req, resp, next) => {
    let token = req.headers['authorization'];
    console.log("AUTHENTICATION MIddleware :", token)
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, JWT_KEY, (err, valid)=>{
            if (err) {
                resp.status(401).json({Error : "Provide valid token"});
                // resp.send({result : "Provide valid token"})
            } else {
                next();
            }
        })
    } else {
        resp.status(401).json({Error : "Add token with header"});
        // resp.send({result : "Add token with header"})
    }
}
