const activityService = require("../services/activityServices");
const Response = require("../middleware/response");
const Messages = require("../messages");

async function showAll(req, res) {
  try {
    res.send(
      new Response(
        Messages.success.code,
        Messages.success.description,
        await activityService.activityList()
      )
    );
    //res.send(new Response( "","",await activityService.activityList()));
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function showByCategory(req, res) {
  try {
    res.send(
      new Response(
        Messages.success.code,
        Messages.success.description,
        await activityService.activityByCategory(req.params.category)
      )
    );
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function getUrl(req, res) {
  try {
    res.send(
      new Response(Messages.success.code, Messages.success.description, {
        Url: await activityService.activityUrl(req.params.activityName),
      })
    );
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

module.exports = {
  showAll: showAll,
  showByCategory: showByCategory,
  getUrl: getUrl,
};
