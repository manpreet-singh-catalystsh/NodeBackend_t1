const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {type:String,unique:true},
    password: String,
    privicyCheck: Boolean,
    promotionCheck: Boolean,
    activityName: String,
    adminMoney:{type:Number,default:0},
    superAdminMoney:{type:Number,default:0},
    money:{type:Number,default:0},
    admin: {type:Boolean,default:false},
    superAdmin: {type:Boolean,default:true},
});

const User = mongoose.model("User", userSchema,"users");
module.exports = User;