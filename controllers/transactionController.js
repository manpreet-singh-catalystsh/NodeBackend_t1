const Transaction = require("../schemas/transactionSchema");
const Activity = require("../schemas/activitiesSchema");
const User  = require("../schemas/userSchema");
const transactionServices = require("../services/transactionServices");
const userServices = require("../services/userServices");
const activityServices = require("../services/activityServices");

async function showUserTransactions(req,res)
{
    var transactions = await transactionServices.showUserTransactions(req.params.userName);
    res.send(transactions);
}

async function showAdminTransactions(req,res)
{
    var transactions = await transactionServices.showUserTransactions(req.params.userName);
     res.send(transactions);
}

async function showAll(req,res)
{
    var transactions = await transactionServices.showAll();
     res.send(transactions);
}

async function superAdminTransaction(req,res)
{
    console.log("request to make transaction recieved!!!!");
    [to,from,amount,activityName,purpose]=[req.body.to,req.body.from,req.body.amount,req.body.activityName,req.body.purpose];
     try
     {
        await userServices.addAmount(to,amount);
   
        const result = await transactionServices.makeTransaction(to,from, amount,activityName,purpose); 
        console.log(result);
        res.send(result);   
    }
     catch(e){console.log("some error occured!!!",e);}
}


async function userTransaction(req,res)
{
    [to,from,amount,activityName,purpose]=[req.body.to,req.body.from,req.body.amount,req.body.activityName,req.body.purpose];
  
    try
    {
               
        var balance = await userServices.getBalance(from);
        if(balance<amount)
        {
            res.send("409");
            return;
        }
       await userServices.deductAmount(from,amount);
        if(activityName=="")
        {
            await userServices.addAmount(to,amount,"superAdmin");
        }
        else
        {
            await userServices.addAmount(to,amount,"admin");
            await activityServices.updateActivityCollection(activityName,amount);
        }

        const result = await transactionServices.makeTransaction(to,from, amount,activityName,purpose); 
        console.log(result);
        res.send(result);     }
     catch(e){console.log("some error occured!!!",e);
    res.send("409")}
}

module.exports.showUserTransactions = showUserTransactions;
module.exports.showAll = showAll;
module.exports.showAdminTransactions = showAdminTransactions;
module.exports.superAdminTransaction = superAdminTransaction;
module.exports.userTransaction = userTransaction;