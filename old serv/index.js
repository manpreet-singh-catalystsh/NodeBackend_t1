
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb://localhost/triboo")
    .then(() => console.log("Connected to triboo in MongoDb ..."))
    .catch(e => console.log("Could not connect to Mongo Db", e));


    i = 0;
app.get("/", (req, res) => {
    console.log("request recieved!!!!", ++i);
    res.send("Hwllo World!!");
})

app.get("/userType/:userName", async (req, res) => {
    
    currentUser = await User.find({userName:req.params.userName});

    console.log(currentUser);
    res.send({"admin":currentUser[0].admin,"superAdmin":currentUser[0].superAdmin});
})

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    privicyCheck: Boolean,
    promotionCheck: Boolean,
    admin: {type:Boolean,default:false},
    superAdmin: {type:Boolean,default:true},
});

const User = mongoose.model("User", userSchema,"users");



async function createUser(userName,password,privicyCheck,promotionCheck)
{
    const user = new User({ userName: userName, password: password, privicyCheck: (privicyCheck === "true"), promotionCheck: promotionCheck === "true" }) 
    const result = await user.save();
    console.log("username : " + userName + "\npassword: " + password);
}

 app.post("/signup", async (req, res) => {

    console.log("post signup received!!");
    var userName = req.body.userName;
    var password = req.body.password;
    var privicyCheck = req.body.privicyCheck;
    var promotionCheck = req.body.promotionCheck;

     try
     {
        currentUser = await User.find({userName:userName});
        //console.log(currentUser);
        if(currentUser.length===0)
            {createUser(userName,password,privicyCheck,promotionCheck);
            console.log("new user");
            res.send("101");
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

                    res.send("103");    // login
                }
                console.log("old user");
            }
     }
     catch(e){console.log("some error occured!!!",e);}

  

 

});



const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`listening on ${port}`) });