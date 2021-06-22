const Category  = require("../schemas/categorySchema");

async function categoriesList()
{
    return(await Category.find());
}

module.exports = {categoriesList : categoriesList};