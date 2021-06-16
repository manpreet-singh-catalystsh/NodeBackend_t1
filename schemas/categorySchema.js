const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {type:String},
    image: String,
});

module.exports = categorySchema;