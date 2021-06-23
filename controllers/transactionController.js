const transactionServices = require("../services/transactionServices");
const userServices = require("../services/userServices");
const activityServices = require("../services/activityServices");
const Response = require("../middleware/response");
const Messages = require("../messages");

async function showUserTransactions(req, res) {
  try {
    res.send(new Response( Messages.success.code,Messages.success.description,  await transactionServices.showUserTransactions(req.params.userName)));
  } catch (e) {
    res.send(new Response( Messages.fail.code,Messages.fail.description,""));
  }
}

async function showAdminTransactions(req, res) {
  try {
    res.send(new Response( Messages.success.code,Messages.success.description,  await transactionServices.showUserTransactions(req.params.userName)));
  } catch (e) {
    res.send(new Response( Messages.fail.code,Messages.fail.description,""));
  }
}

async function showAll(req, res) {
  try {
    res.send(new Response( Messages.success.code,Messages.success.description,  await transactionServices.showAll()));
  } catch (e) {
    res.send(new Response( Messages.fail.code,Messages.fail.description,""));
  }
}

async function superAdminTransaction(req, res) {
  console.log("request to make transaction recieved!!!!");
  var { to, from, amount, activityName, purpose } = req.body;
  try {
    await userServices.addAmount(to, amount);
    const result = await transactionServices.makeTransaction(
      to,
      from,
      amount,
      activityName,
      purpose
    );
    console.log(result);
    res.send(new Response( Messages.success.code,Messages.success.description,  result));
  } catch (e) {
    res.send(new Response( Messages.fail.code,Messages.fail.description,""));
    console.log("some error occured!!!", e);
  }
}

async function userTransaction(req, res) {
  var { to, from, amount, activityName, purpose } = req.body;
  try {
    var balance = await userServices.getBalance(from);
    if (balance < amount) {
      res.send("409");
      return;
    }
    await userServices.deductAmount(from, amount);
    if (activityName == "") {
      await userServices.addAmount(to, amount, "superAdmin");
    } else {
      await userServices.addAmount(to, amount, "admin");
      await activityServices.updateActivityCollection(activityName, amount);
    }

    const result = await transactionServices.makeTransaction(
      to,
      from,
      amount,
      activityName,
      purpose
    );
    console.log(result);
    res.send(new Response( Messages.success.code,Messages.success.description,  result));
  } catch (e) {
    res.send(new Response( Messages.fail.code,Messages.fail.description,""));
  }
}

module.exports = {
  showUserTransactions: showUserTransactions,
  showAll: showAll,
  showAdminTransactions: showAdminTransactions,
  superAdminTransaction: superAdminTransaction,
  userTransaction: userTransaction,
};
