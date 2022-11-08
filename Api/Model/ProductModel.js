const mongoose = require("mongoose");
const Joi = require("joi")


const productSchema=mongoose.Schema({
    item_img:{type:String,required:true},
    item_name:{type:String,required:true,minlength:3},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'category',required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    stock:{type:Number,required:true},
    date:{type:Date,default:Date.now}

})

const productModel = new mongoose.model('product',productSchema)

const validate  = (product)=>{
    const schema = Joi.object({
        product_image:Joi.string().required(),
        product_name:Joi.string().min(3).required(),
        category:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),
        stock:Joi.number().required()
    })
    return schema.validate(product)
}

module.exports = {productModel,validate}

