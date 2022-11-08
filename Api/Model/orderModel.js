const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderUserId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    razorpay_payment_id:{type:String,default:false,required:true},
    razorpay_order_id:{type:String,default:false,required:true},
    paymentStatus: { type: Boolean, default: false, required: true },
    isdelivered:{type:Boolean,default:false,required:true},
    qty:{type:Number,required:true},
    pdf:{type:Boolean,default:false,required:true},
    date:{type:Date,default:Date.now(),required:true},
    Activeorder:{type:Boolean,default:true,required:true},
    address:{type: mongoose.Schema.Types.ObjectId,ref:"address",required:true},
    totalPrice:{type:Number,required:true},
    paymentType:{type:String,required:true}
})

const orderModel = new mongoose.model("order", orderSchema)

const validOrder = (data)=>{
    const schema = Joi.object({
        paymentType:Joi.string().required()
    })
    return schema.validate(data)
}

const orderOtpSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    otp:{type:Number,required:true},
    date:{type:Date,default:Date.now()}
})
const orderOtpModel = new mongoose.model("orderOtp", orderOtpSchema);

module.exports={orderModel,orderOtpModel,validOrder}