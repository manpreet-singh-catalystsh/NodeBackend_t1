const Activity = require("../schemas/activitiesSchema");

async function activityList()
{
    var activities = await Activity.find();
    return(activities);
}

async function activityByCategory(category)
{
    var activities = await Activity.find({category:category});
    return (activities);
}

async function activityUrl(activityName)
{
    var activity = await Activity.findOne({name:activityName});
    return(activity.image);
}

async function updateActivityCollection(activityName,amount)
{
    var activity = await Activity.findOne({name:activityName});
    activity.collections+=amount;
    var result = activity.save();
    return result;
}

module.exports.activityList = activityList;
module.exports.activityByCategory = activityByCategory;
module.exports.activityUrl = activityUrl;
module.exports.updateActivityCollection=updateActivityCollection;