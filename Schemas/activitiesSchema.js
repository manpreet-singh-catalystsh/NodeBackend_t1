const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
    name: {type:String},
    category:String,
    image : String,
    collections: Number,
});

module.exports = activitySchema;