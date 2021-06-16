
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const activitySchema = require("../Schemas/activitiesSchema");
const userSchema  = require("../Schemas/userSchema");

router.use(express.json());

router.get("/", async(req, res) => {
    console.log("transactions request recieved!!!!");
    res.send("Hwllo World!!");   
});


router.get("/user/:userName", async (req, res) => {
    transactions = await Transaction.find().or ([{to:req.params.userName},{from:req.params.userName}]);
   // console.log(currentUser);
    res.send(transactions);
});

router.get("/admin/:userName", async (req, res) => {
    transactions = await Transaction.find ({to:req.params.userName});
    //console.log(currentUser);
    res.send(transactions);
});

router.post("/makeTransaction", async(req,res)=>
{
    console.log("request to make transaction recieved!!!!");
    
    var to = req.body.to;
    var from = req.body.from;
    var amount = req.body.amount;
    var activityName = req.body.activityName;
    var purpose = req.body.purpose;
     try
     {
        var tmp1 = mongoose.model('tmp1', userSchema,"users");
        var _user = await tmp1.find({userName:to});
        _user=_user[0];
        _user.money+=amount;
        _user.save();


        const transaction = new Transaction({ to: to, from:from, amount:amount,activityName:activityName,purpose:purpose }); 
        const result = await transaction.save();
        console.log(result);
        res.send(result);   
    }
     catch(e){console.log("some error occured!!!",e);}
});



router.post("/makeUserTransaction", async(req,res)=>
{
    console.log("request to make transaction recieved!!!!");
    
    var to = req.body.to;
    var from = req.body.from;
    var amount = req.body.amount;
    var activityName = req.body.activityName;
    var purpose = req.body.purpose;
    try
    {
        var tmp1 = mongoose.model('tmp1', userSchema,"users");
        var tmp2 = mongoose.model('tmp2', activitySchema,"activities");        
        var _user = await tmp1.find({userName:from});
        _user=_user[0];
        console.log(_user);

        if(_user.money<amount)
        {
            res.send("409")
            return;
        }
        _user.money-=amount;
        _user.save();
        _user = await tmp1.find({userName:to});
        _user=_user[0];
        if(activityName=="")
        {
            _user.superAdminMoney+=amount;
            _user.save();
        }

        else
        {
            _user.adminMoney+=amount;
            _user.save();
            console.log(activityName);
            var _activity  = await tmp2.find({name:activityName});
            _activity[0].collections+=amount;
            _activity[0].save();
        }

    const transaction = new Transaction({ to: to, from:from, amount:amount,activityName:activityName,purpose:purpose }); 
    const result = await transaction.save();
    console.log(result);
    res.send(result);   

/*
        const transaction = new Transaction({ to: to, from:from, amount:amount,activityName:activityName,purpose:purpose }); 
        const result = await transaction.save();
        console.log(result);
        res.send(result);   */
    }
     catch(e){console.log("some error occured!!!",e);
    res.send("409")}


});

// testing purpose only
router.get("/addDummyTransaction", async(req, res) => {
    console.log("transactions request recieved!!!!"); 
    const transaction = new Transaction({ to: "+390123456789", from:"+391234567890", amount:20,activityName:"",purpose:"printingMoney" }); 
    const result = await transaction.save();
    res.send(result);   
});

router.get("/all", async (req, res) => 
{
    console.log("all transactions requested!!!!");
    transactions = await Transaction.find();
    res.send(transactions);

});




const transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    purpose: String,
    activityName: String,
    amount: Number,
},{ timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema,"transactions");



module.exports = router;
