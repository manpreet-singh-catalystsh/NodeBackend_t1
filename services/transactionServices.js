const Transaction = require("../schemas/transactionSchema");
const Activity = require("../schemas/activitiesSchema");
const User  = require("../schemas/userSchema");

async function showUserTransactions(user)
{
    var transactions = await Transaction.find().or([{to:user},{from:user}]);
    return(transactions);
}

async function showAdminTransactions(user)
{
    var transactions = await Transaction.find ({to:user});
     return(transactions);
}

async function showAll()
{
    var transactions = await Transaction.find ();
    return(transactions);
}

async function makeTransaction(to,from,amount,activityName,purpose)
{
     try
     {
        const transaction = new Transaction({ to: to, from:from, amount:amount,activityName:activityName,purpose:purpose }); 
        const result = await transaction.save();
        return(result);   
    }
     catch(e){console.log("some error occured!!!",e);}
}


module.exports.showUserTransactions = showUserTransactions;
module.exports.showAll = showAll;
module.exports.showAdminTransactions = showAdminTransactions;
module.exports.makeTransaction = makeTransaction;