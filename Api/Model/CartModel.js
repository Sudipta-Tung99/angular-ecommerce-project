const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    qty:{type:Number,required:true}
})

const cartModel = new mongoose.model("cart",cartSchema);

module.exports = {cartModel}