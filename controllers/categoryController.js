const Category  = require("../schemas/categorySchema");

async function showAll(req,res)
{
    var categories = await Category.find();
    res.send(categories);
}

module.exports = showAll;