
const Joi = require("joi");
const mongoose  = require("mongoose");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const { boolean } = require("joi");

const userSchema = mongoose.Schema({
    name:{type:String,minlength:3,maxlength:20,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,maxlength:15,minlength:8},
    role:{type:String, enum:["admin","user","retailer"] ,default:"user"},
    verify:{type:Boolean,default:false}
})

userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getAuthToken=function(){
    const token = jwt.sign({_id:this._id,name:this.name,role:this.role,},process.env.token_key,{expiresIn:Date.now()+10 * 60 * 1000});
    return token
}

const userValidation = (user)=>{
    const schema  = Joi.object({
        name:Joi.string().max(20).min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().max(15).min(8).required()
    })
    return schema.validate(user,{abortEarly:false})
}

const userLoginValidation = (user)=>{
    const schema  = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().max(15).min(8).required()
    })
    return schema.validate(user,{abortEarly:false})
}

const userModel = new mongoose.model("user",userSchema)

module.exports={userModel,userValidation,userLoginValidation}