/*jshint esversion: 6 */

const jwt = require("jsonwebtoken");

function genWebToken(_id,_userName)
{
    return jwt.sign({id:_id,userName:_userName},"jwtPvtKey");
}

module.exports = genWebToken;