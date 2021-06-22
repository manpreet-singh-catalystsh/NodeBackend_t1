const categoryServices  = require("../services/categoryServices");

async function showAll(req,res)
{
    try{
    res.send(await categoryServices.categoriesList());}
    catch(e){}
}

module.exports = showAll;