const activityService = require("../services/activityServices");

async function showAll(req,res)
{
    var activities = await activityService.activityList()
    res.send(activities);
}

async function showByCategory(req,res)
{
    var activities = await activityService.activityByCategory(req.params.category);
    res.send(activities);
}

async function getUrl(req,res)
{
    var url = await activityService.activityUrl(req.params.activityName);
    res.send({"Url":url});
}

module.exports.showAll = showAll;
module.exports.showByCategory = showByCategory;
module.exports.getUrl = getUrl;