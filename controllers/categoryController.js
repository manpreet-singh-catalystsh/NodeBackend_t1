const categoryServices  = require("../services/categoryServices");

async function showAll(req,res)
{
    var categories = await categoryServices.categoriesList();
    res.send(categories);
}

module.exports = showAll;