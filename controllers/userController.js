const authToken = require("../controllers/webToken");
const userServices = require("../services/userServices");

async function getType(req, res) {
  try {
    var currentUser = await userServices.getType(req.params.userName);
    if (currentUser)
      res.send({
        admin: currentUser.admin,
        superAdmin: currentUser.superAdmin,
      });
    res.send("404");
  } catch (e) {
    res.send("404");
  }
}

async function getAdminCollection(req, res) {
  try {
    res.send({
      money: await userServices.getAdminCollection(req.params.userName),
    });
  } catch (e) {
    res.send("404");
  }
}

async function getBalance(req, res) {
  try {
    res.send({ money: await userServices.getBalance(req.params.userName) });
  } catch (e) {
    res.send("404");
  }
}

async function getAssociatedActivity(req, res) {
  try {
    res.send({
      activityName: await userServices.getAssociatedActivity(
        req.params.userName
      ),
    });
  } catch (e) {
    res.send("404");
  }
}

async function signup(req, res) {
  console.log("post signup received!!");
  var { userName, password, privicyCheck, promotionCheck, superAdmin, admin } =
    req.body;

  try {
    currentUser = await userServices.userExists(userName);
    console.log(currentUser)
    if (!currentUser) {
      rslt = await userServices.createUser(
        userName,
        password,
        privicyCheck,
        promotionCheck,
        admin,
        superAdmin
      );
      res.send(authToken(rslt.id, rslt.userName));
    }

    if (!await userServices.verifyPassword(userName, password)) {
      res.send("102"); //invalid password!!!!
    }
    await userServices.updateChecks(userName, privicyCheck, promotionCheck);
    res.send(authToken(currentUser.id, currentUser.userName)); // login
    console.log("old user");
  } catch (e) {
    console.log("some error occured!!!", e);
  }
}

module.exports = {
  getType: getType,
  signup: signup,
  getAdminCollection: getAdminCollection,
  getAssociatedActivity: getAssociatedActivity,
  getBalance: getBalance,
};
