
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.use(express.json());

router.get("/", (req, res) => {
    console.log("categories recieved!!!!");
    res.send("Hwllo World!!");    
});

router.get("/all", async (req, res) => 
{
    console.log("activities collections requested!!!!");

    categories = await Category.find();
    res.send(categories);
    //res.send()

});


const categorySchema = new mongoose.Schema({
    name: {type:String},
    image: String,
});
const Category = mongoose.model("Category", categorySchema,"categories");




module.exports = router;