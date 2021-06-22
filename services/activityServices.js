const Activity = require("../schemas/activitiesSchema");

async function activityList()
{
    return(await Activity.find());
}

async function activityByCategory(category)
{
    return (await Activity.find({category:category}));
}

async function activityUrl(activityName)
{
    return(await Activity.findOne({name:activityName}).select("image"));
}

async function updateActivityCollection(activityName,amount)
{
    var activity = await Activity.findOne({name:activityName});
    activity.collections+=amount;
    var result = activity.save();
    return result;
}

module.exports = {activityList : activityList,activityByCategory : activityByCategory,activityUrl : activityUrl,updateActivityCollection : updateActivityCollection};
