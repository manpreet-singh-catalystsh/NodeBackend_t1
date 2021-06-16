const Transaction = require("../schemas/transactionSchema");
const Activity = require("../schemas/activitiesSchema");
const User  = require("../schemas/userSchema");

async function showUserTransactions(req,res)
{
    var transactions = await Transaction.find().or ([{to:req.params.userName},{from:req.params.userName}]);
     res.send(transactions);
}

async function showAdminTransactions(req,res)
{
    var transactions = await Transaction.find ({to:req.params.userName});
     res.send(transactions);
}

async function showAll(req,res)
{
    var transactions = await Transaction.find ();
     res.send(transactions);
}

async function superAdminTransaction(req,res)
{
    console.log("request to make transaction recieved!!!!");
    [to,from,amount,activityName,purpose]=[req.body.to,req.body.from,req.body.amount,req.body.activityName,req.body.purpose];
     try
     {
        var tmp1 = User;
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
}


async function userTransaction(req,res)
{
    console.log("request to make transaction recieved!!!!");
    [to,from,amount,activityName,purpose]=[req.body.to,req.body.from,req.body.amount,req.body.activityName,req.body.purpose];
  
    try
    {
        var tmp1 = User;
        var tmp2 = Activity;       
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
    res.send(result);   }
     catch(e){console.log("some error occured!!!",e);
    res.send("409")}
}

module.exports.showUserTransactions = showUserTransactions;
module.exports.showAll = showAll;
module.exports.showAdminTransactions = showAdminTransactions;
module.exports.superAdminTransaction = superAdminTransaction;
module.exports.userTransaction = userTransaction;