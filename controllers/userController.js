const authToken = require("../controllers/webToken");
const User = require("../schemas/userSchema");

async function getType(req,res)
{
    var currentUser = await User.find({userName:req.params.userName});
    console.log(currentUser);
    if(currentUser.length!=0)
        res.send({"admin":currentUser[0].admin,"superAdmin":currentUser[0].superAdmin});
    else
        res.send("404");
}

async function getAdminCollection(req,res)
{
    var currentUser = await User.find({userName:req.params.userName});   
    if(currentUser.length!=0)
    {
       res.send({"money":currentUser[0].adminMoney});   
    }
    else
        res.send("404");
}

async function getBalance(req,res)
{
    var currentUser = await User.find({userName:req.params.userName});   
    if(currentUser.length!=0)
    {
       res.send({"money":currentUser[0].money});
        
        console.log(currentUser[0].money);    
    }
    else
        res.send("404");
}

async function getAssociatedActivity(req,res)
{
    currentUser = await User.find({userName:req.params.userName});   
    if(currentUser.length!=0)
    {
       res.send({"activityName":currentUser[0].activityName});
        console.log(currentUser[0].activityName);    
    }
    else
        res.send("404");
}


async function signup(req,res)
{
    console.log("post signup received!!");
    var userName = req.body.userName;
    var password = req.body.password;
    var privicyCheck = req.body.privicyCheck;
    var promotionCheck = req.body.promotionCheck;
    var admin = req.body.admin;
    var superAdmin = req.body.superAdmin;

     try
     {
        currentUser = await User.find({userName:userName});
        //console.log(currentUser);
        if(currentUser.length===0)
            {rslt = await createUser(userName,password,privicyCheck,promotionCheck,admin,superAdmin);
            console.log(rslt);
              console.log(authToken);  
            res.send(authToken(rslt.id,rslt.userName));
            }
        else
            {
                currentUser = await User.find({userName:userName,password:password});
                
                if(currentUser.length===0)
                {
                    res.send("102");  //invalid password!!!!
                }
                else
                {
                    currentUser[0].privicyCheck=privicyCheck==="true";
                    currentUser[0].promotionCheck=promotionCheck==="true";
                    currentUser[0].save();

                    res.send(authToken(currentUser[0].id,currentUser[0].userName));   // login
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