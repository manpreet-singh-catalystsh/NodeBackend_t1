const authToken = require("../controllers/webToken");
const userServices = require("../services/userServices");
const Response = require("../middleware/response");
const Messages = require("../messages");
const validationSchemas = require("../schemas/validationSchemas");

async function getType(req, res) {
  if (validationSchemas.userName.validate(req.params).error)
    return res.send(
      new Response(
        Messages.validationFailed.code,
        Messages.validationFailed.description,
        ""
      )
    );
  try {
    var currentUser = await userServices.getType(req.params.userName);
    if (currentUser)
      return res.send(
        new Response(Messages.success.code, Messages.success.description, {
          admin: currentUser.admin,
          superAdmin: currentUser.superAdmin,
        })
      );
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function getAdminCollection(req, res) {
  if (validationSchemas.userName.validate(req.params).error)
  return res.send(
    new Response(
      Messages.validationFailed.code,
      Messages.validationFailed.description,
      ""
    )
  );
  try {
    res.send(
      new Response(
        Messages.success.code,
        Messages.success.description,
        await userServices.getAdminCollection(req.params.userName)
      )
    );
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function getBalance(req, res) {
  if (validationSchemas.userName.validate(req.params).error)
  return res.send(
    new Response(
      Messages.validationFailed.code,
      Messages.validationFailed.description,
      ""
    )
  );
  try {
    res.send(
      new Response(
        Messages.success.code,
        Messages.success.description,
        await userServices.getBalance(req.params.userName)
      )
    );
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function getAssociatedActivity(req, res) {
  if (validationSchemas.userName.validate(req.params).error)
  return res.send(
    new Response(
      Messages.validationFailed.code,
      Messages.validationFailed.description,
      ""
    )
  );
  try {
    res.send(
      new Response(Messages.success.code, Messages.success.description, {
        activityName: await userServices.getAssociatedActivity(
          req.params.userName
        ),
      })
    );
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
  }
}

async function signup(req, res) {
  if (validationSchemas.signup.validate(req.params).error)
  return res.send(
    new Response(
      Messages.validationFailed.code,
      Messages.validationFailed.description,
      ""
    )
  );
  console.log("post signup received!!");
  var { userName, password, privicyCheck, promotionCheck, superAdmin, admin } =
    req.body;

  try {
    currentUser = await userServices.userExists(userName);
    console.log(currentUser);
    if (!currentUser) {
      rslt = await userServices.createUser(
        userName,
        password,
        privicyCheck,
        promotionCheck,
        admin,
        superAdmin
      );
      var tkn = authToken(rslt.id, rslt.userName);
      console.log(tkn);
      return res.send(
        new Response(Messages.success.code, Messages.success.description, tkn)
      );
    }

    if (!(await userServices.verifyPassword(userName, password))) {
      return res.send(
        new Response(Messages.fail.code, Messages.fail.description, "")
      ); //invalid password!!!!
    }
    await userServices.updateChecks(userName, privicyCheck, promotionCheck);
    tkn = authToken(currentUser.id, currentUser.userName);
    console.log(tkn);
    return res.send(
      new Response(Messages.success.code, Messages.success.description, tkn)
    );
    // login
    console.log("old user");
  } catch (e) {
    res.send(new Response(Messages.fail.code, Messages.fail.description, ""));
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
