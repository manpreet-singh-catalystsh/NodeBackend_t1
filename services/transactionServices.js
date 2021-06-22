const Transaction = require("../schemas/transactionSchema");
const Activity = require("../schemas/activitiesSchema");
const User = require("../schemas/userSchema");

async function showUserTransactions(user) {
  return await Transaction.find().or([{ to: user }, { from: user }]);
}

async function showAdminTransactions(user) {
  return await Transaction.find({ to: user });
}

async function showAll() {
  return await Transaction.find();
}

async function makeTransaction(to, from, amount, activityName, purpose) {
  const transaction = new Transaction({
    to: to,
    from: from,
    amount: amount,
    activityName: activityName,
    purpose: purpose,
  });
  return await transaction.save();
}

module.exports = {showUserTransactions : showUserTransactions,showAll : showAll,showAdminTransactions : showAdminTransactions,makeTransaction : makeTransaction};
