/*jshint esversion: 6 */
const Base64 = require("js-base64");

const SECRET_KEY = require("../vars");
const jwt = require("jsonwebtoken");

function genWebToken(_id,_userName)
{
   // console.log("KEY :--->"+SECRET_KEY);//
    //console.log("encoding :--->"+Base64.encode( SECRET_KEY));//
    return jwt.sign({userName:_userName,id:_id},Base64.encode( SECRET_KEY));//
}

module.exports = genWebToken;