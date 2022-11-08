const Joi = require("joi");
const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    name: { type: String, required: true },
    number: { type: Number, length: 10, required: true },
    pincode: { type: Number, required: true },
    address: { type: String, require: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    state: { type: String, required: true },
    alternativeNumber: { type: Number, length: 10 },
    active:{type:Boolean,default:true},
    date:{type:Date,default:Date.now()},
    landmark: { type: String, required: true },
    addressType: { type: String, enum: ["Home", "Work"], required: true }
})

const addressModel = new mongoose.model("address", addressSchema);

const validAdress = (address) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        number: Joi.number().integer().required(),
        pincode: Joi.number().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        locality: Joi.string().required(),
        state: Joi.string().required(),
        landmark: Joi.string().required(),
        addressType: Joi.string().required()
    })
    return schema.validate(address,{abortEarly:false})
}

module.exports={validAdress,addressModel}