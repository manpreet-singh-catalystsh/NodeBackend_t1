/*jshint esversion: 6 */

const SECRET_KEY = require("../vars");
const jwt = require("jsonwebtoken");

function genWebToken(_id,_userName)
{
    return jwt.sign({id:_id,userName:_userName},SECRET_KEY);
}

module.exports = genWebToken;