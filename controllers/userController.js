const authToken = require("../controllers/webToken");
const userServices = require("../services/userServices");

async function getType(req,res)
{
    var currentUser = await userServices.getType(req.params.userName);
    if(currentUser)
        res.send({"admin":currentUser.admin,"superAdmin":currentUser.superAdmin});
    else
        res.send("404");
}

async function getAdminCollection(req,res)
{
    var adminCollection = await userServices.getAdminCollection(req.params.userName);   
    if(adminCollection)
    {
       res.send({"money":adminCollection});   
    }
    else
        res.send("404");
}

async function getBalance(req,res)
{
    var balance = await userServices.getBalance(req.params.userName);   
    if(balance)
    {
       res.send({"money":balance});
    }
    else
        res.send("404");
}

async function getAssociatedActivity(req,res)
{
    activity = await userServices.getAssociatedActivity(req.params.userName);   
    if(activity)
    {
       res.send({"activityName":activity});
    }
    else
        res.send("404");
}


async function signup(req,res)
{
    console.log("post signup received!!");
    [userName,password,privicyCheck,promotionCheck,admin,superAdmin] = [req.body.userName,req.body.password,req.body.privicyCheck,req.body.promotionCheck,req.body.admin,req.body.superAdmin];
     try
     {
        currentUser = await userServices.userExists(userName);
        if(!currentUser)
            {
                rslt = await userServices.createUser(userName,password,privicyCheck,promotionCheck,admin,superAdmin); 
                res.send(authToken(rslt.id,rslt.userName));
            }
        else
            {
                currentUser = await userServices.verifyPassword(userName,password);
                if(!currentUser)
                {
                    res.send("102");  //invalid password!!!!
                }
                else
                {
                   await userServices.updateChecks(userName,privicyCheck,promotionCheck);
                    res.send(authToken(currentUser.id,currentUser.userName));   // login
                }
                console.log("old user");
            }
     }
     catch(e){console.log("some error occured!!!",e);}
}


module.exports.getType = getType;
module.exports.signup = signup;
module.exports.getAdminCollection = getAdminCollection;
module.exports.getAssociatedActivity = getAssociatedActivity;
module.exports.getBalance=getBalance;