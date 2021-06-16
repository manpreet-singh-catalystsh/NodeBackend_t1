const authToken = require("../controllers/webToken");
const User = require("../schemas/userSchema");

async function getType(req,res)
{
    var currentUser = await User.findOne({userName:req.params.userName});
    console.log(currentUser);
    if(currentUser.length!=0)
        res.send({"admin":currentUser.admin,"superAdmin":currentUser.superAdmin});
    else
        res.send("404");
}

async function getAdminCollection(req,res)
{
    var currentUser = await User.findOne({userName:req.params.userName});   
    if(currentUser)
    {
       res.send({"money":currentUser.adminMoney});   
    }
    else
        res.send("404");
}

async function getBalance(req,res)
{
    var currentUser = await User.findOne({userName:req.params.userName});   
    if(currentUser)
    {
       res.send({"money":currentUser.money});
    
    }
    else
        res.send("404");
}

async function getAssociatedActivity(req,res)
{
    currentUser = await User.findOne({userName:req.params.userName});   
    if(currentUser)
    {
       res.send({"activityName":currentUser.activityName});
        console.log(currentUser.activityName);    
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
        currentUser = await User.findOne({userName:userName});
        if(!currentUser)
            {rslt = await createUser(userName,password,privicyCheck,promotionCheck,admin,superAdmin);
            console.log(rslt);
              console.log(authToken);  
            res.send(authToken(rslt.id,rslt.userName));
            }
        else
            {
                currentUser = await User.findOne({userName:userName,password:password});
                if(!currentUser)
                {
                    res.send("102");  //invalid password!!!!
                }
                else
                {
                    currentUser.privicyCheck=privicyCheck==="true";
                    currentUser.promotionCheck=promotionCheck==="true";
                    currentUser.save();
                    res.send(authToken(currentUser.id,currentUser.userName));   // login
                }
                console.log("old user");
            }
     }
     catch(e){console.log("some error occured!!!",e);}
}

async function createUser(userName,password,privicyCheck,promotionCheck,admin,superAdmin)
{
    const user = new User({ userName: userName, password: password, privicyCheck: (privicyCheck === "true"), promotionCheck: promotionCheck === "true" ,admin:(admin === "true"),superAdmin:(superAdmin === "true"),}) 
    const result = await user.save();
    console.log("username : " + userName + "\npassword: " + password);
    return result;
}

module.exports.getType = getType;
module.exports.signup = signup;
module.exports.getAdminCollection = getAdminCollection;
module.exports.getAssociatedActivity = getAssociatedActivity;
module.exports.getBalance=getBalance;