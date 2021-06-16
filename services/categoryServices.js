const Category  = require("../schemas/categorySchema");

async function categoriesList()
{
    var categories = await Category.find();
    return(categories);
}

module.exports.categoriesList = categoriesList;