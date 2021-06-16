const jwt = require("jsonwebtoken");

function auth(req,res,next)
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("No auth Token");

    try{
    const decoded = jwt.verify(token,"jwtPvtKey");
   // req.userName = decoded;
    next();
    }
    
    catch (e){
        res.status(400).send("Invalid Token");
    }
}

module.exports = auth;