const mongoose = require("mongoose");

const userOtp = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    otp:{type:Number,required:true},
    expire:Date
})

const otpModel = new mongoose.model("verify",userOtp);

module.exports = {otpModel}