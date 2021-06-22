const User = require("../schemas/userSchema");

async function getType(user) {
  return await User.findOne({ userName: user });
}

async function getAdminCollection(user) {
  return await User.findOne({ userName: user });
}

async function getBalance(user) {
  return await User.findOne({ userName: user }).select("money");
}

async function getAssociatedActivity(user) {
  return await User.findOne({ userName: user }).select("activityName");
}

async function userExists(user) {
  return (await User.findOne({ userName: user })) ? true : false;
}

async function verifyPassword(user, password) {
  return (await User.findOne({ userName: user, password: password }))
    ? true
    : false;
}

async function updateChecks(user, privicy, promotion) {
  currentUser = await User.findOne({ userName: user });
  currentUser.privicyCheck = privicy === "true";
  currentUser.promotionCheck = promotion === "true";
  await currentUser.save();
  return;
}

async function createUser(
  userName,
  password,
  privicyCheck,
  promotionCheck,
  admin,
  superAdmin
) {
  const user = new User({
    userName: userName,
    password: password,
    privicyCheck: privicyCheck === "true",
    promotionCheck: promotionCheck === "true",
    admin: admin === "true",
    superAdmin: superAdmin === "true",
  });
  return await user.save();
}

async function deductAmount(user, amount) {
  var _user = await User.findOne({ userName: user });
  _user.money -= amount;
  await _user.save();
  return;
}

async function addAmount(user, amount, type = "user") {
  var _user = await User.findOne({ userName: user });
  if (type == "user") _user.money += amount;
  else if (type == "admin") _user.adminMoney += amount;
  else _user.superAdminmoney += amount;
 await _user.save();
  return;
}

module.exports = {
  getType: getType,
  userExists: userExists,
  verifyPassword: verifyPassword,
  updateChecks: updateChecks,
  createUser: createUser,
  getAdminCollection: getAdminCollection,
  getAssociatedActivity: getAssociatedActivity,
  getBalance: getBalance,
  deductAmount: deductAmount,
  addAmount: addAmount
};
