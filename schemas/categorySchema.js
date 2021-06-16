const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {type:String},
    image: String,
});
const Category = mongoose.model("Category", categorySchema,"categories");
module.exports = Category;