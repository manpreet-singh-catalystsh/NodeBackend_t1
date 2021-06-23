const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../vars");

function auth(req,res,next)
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("No auth Token");

    try{
        jwt.verify(token, SECRET_KEY, async (err, payload) => {
            if (err) {
              console.log(err);
              return res.status(401).send({ error: "Token not authorised" });
            }
            req.userName = payload.userName;
            next();
    });}
    catch (e){
        res.status(400).send("Invalid Token");
    }
}

module.exports = auth;