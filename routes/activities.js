
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.use(express.json());

router.get("/", (req, res) => {
    console.log("activities recieved!!!!");
    res.send("Hwllo World!!");    
});

router.get("/all", async (req, res) => 
{
    console.log("all activities requested!!!!");

    activities = await Activity.find();
    res.send(activities);
    //res.send()

});

router.get("/category/:category", async (req, res) => 
{
    console.log("activities collections requested!!!!");

    activities = await Activity.find({category:req.params.category});
    res.send(activities);
    //res.send()

});

router.get("/Url/:activityName", async (req, res) => 
{
    console.log("activity url requested!!!!");

    activities = await Activity.find({name:req.params.activityName});
    res.send({"Url":activities[0].image});
    //res.send()

});



const activitySchema = new mongoose.Schema({
    name: {type:String},
    category:String,
    image : String,
    collections: Number,
});
const Activity = mongoose.model("Activity", activitySchema,"activities");




module.exports = router;