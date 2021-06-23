const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: {type:String,unique:true},
    password:  { type: String, required: true },
    privicyCheck: Boolean,
    promotionCheck: Boolean,
    activityName: String,
    adminMoney:{type:Number,default:0},
    superAdminMoney:{type:Number,default:0},
    money:{type:Number,default:0},
    admin: {type:Boolean,default:false},
    superAdmin: {type:Boolean,default:true},
});

userSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  };
  userSchema.statics.comparePassword = async function (password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword);
  };


const User = mongoose.model("User", userSchema,"users");
module.exports = User;