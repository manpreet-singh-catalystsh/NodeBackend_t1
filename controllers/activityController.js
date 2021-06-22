const activityService = require("../services/activityServices");

async function showAll(req, res) {
  try {
    res.send(await activityService.activityList());
  } catch (e) {}
}

async function showByCategory(req, res) {
  try {
    res.send(await activityService.activityByCategory(req.params.category));
  } catch (e) {}
}

async function getUrl(req, res) {
  try {
    res.send({
      Url: await activityService.activityUrl(req.params.activityName),
    });
  } catch (e) {}
}

module.exports = {
  showAll: showAll,
  showByCategory: showByCategory,
  getUrl: getUrl,
};
