const Activity = require("../schemas/activitiesSchema");

async function showAll(req,res)
{
    var activities = await Activity.find();
    res.send(activities);
}

async function showByCategory(req,res)
{
    var activities = await Activity.find({category:req.params.category});
    res.send(activities);
}

async function getUrl(req,res)
{
    var activities = await Activity.findOne({name:req.params.activityName});
    res.send({"Url":activities.image});
}

module.exports.showAll = showAll;
module.exports.showByCategory = showByCategory;
module.exports.getUrl = getUrl;