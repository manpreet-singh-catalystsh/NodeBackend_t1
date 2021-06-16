const authToken = require("../controllers/webToken");
const User = require("../schemas/userSchema");

async function getType(user)
{
    var currentUser = await User.findOne({userName:user});
    return currentUser;
}

async function getAdminCollection(user)
{
    var currentUser = await User.findOne({userName:user});   
    return currentUser.adminMoney;
}

async function getBalance(user)
{
    var currentUser = await User.findOne({userName:user});   
    return currentUser.money;
}

async function getAssociatedActivity(user)
{
    currentUser = await User.findOne({userName:user});   
    return currentUser.activityName
}

async function userExists(user)
{
    currentUser = await User.findOne({userName:user});   
    if(currentUser)
        return true;
    else
        return false;
}


async function verifyPassword(user,password)
{
    currentUser = await User.findOne({userName:user,password:password});  
    if(currentUser)
        return true;
    else
        return false;
}


async function updateChecks(user,privicy,promotion)
{
    currentUser = await User.findOne({userName:user,password:password});  
    currentUser.privicyCheck=privicy==="true";
    currentUser.promotionCheck=promotion==="true";
    currentUser.save();
    return;
}

async function createUser(userName,password,privicyCheck,promotionCheck,admin,superAdmin)
{
    const user = new User({ userName: userName, password: password, privicyCheck: (privicyCheck === "true"), promotionCheck: promotionCheck === "true" ,admin:(admin === "true"),superAdmin:(superAdmin === "true"),}) 
    const result = await user.save();
    return result;
}




async function deductAmount(user,amount)
{
    var _user = await User.findOne({userName:user});
    _user.money-=amount;
    _user.save();
    return;
}

async function addAmount(user,amount,type="user")
{
    var _user = await User.findOne({userName:user});
    if(type=="user")
        _user.money+=amount;
    else if(type=="admin")
    _user.adminMoney+=amount;
    else if(type=="superAdmin")
    _user.superAdminmoney+=amount;
    _user.save();
    return;
}



module.exports.getType = getType;
module.exports.userExists = userExists;
module.exports.verifyPassword=verifyPassword;
module.exports.updateChecks= updateChecks;
module.exports.createUser = createUser;
module.exports.getAdminCollection = getAdminCollection;
module.exports.getAssociatedActivity = getAssociatedActivity;
module.exports.getBalance=getBalance;
module.exports.deductAmount=deductAmount;
module.exports.addAmount=addAmount;