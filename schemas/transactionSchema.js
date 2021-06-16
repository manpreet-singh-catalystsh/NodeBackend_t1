const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    purpose: String,
    activityName: String,
    amount: Number,
},{ timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema,"transactions");
module.exports = Transaction;