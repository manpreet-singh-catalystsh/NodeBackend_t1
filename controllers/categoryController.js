const categoryServices  = require("../services/categoryServices");
const Response = require("../middleware/response");
const Messages = require("../messages");

async function showAll(req,res)
{
    try{
        res.send(new Response( Messages.success.code,Messages.success.description, await categoryServices.categoriesList()));
  }
    catch(e){
        res.send(new Response( Messages.fail.code,Messages.fail.description,""));
    }
}

module.exports = showAll;