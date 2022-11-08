const mongoose = require("mongoose");
const joi = require('joi');

const CategorySchema = mongoose.Schema({
  category_name:{type:String,required:true,minlength:3},
  category_Image:{type:String,required:true}

})


const CategoryModel = new mongoose.model('category',CategorySchema);

function validateCata(category) {
    const schema = joi.object( {
      category_name:joi.string().min(3).required(),
      category_Image:joi.required(),
     
    })
    return schema.validate(category)
}

function validateUpdateCata(category) {
  const schema = joi.object( {
    category_name:joi.string().min(3).required(),
  })
  return schema.validate(category)
}

module.exports = {CategoryModel,validateCata,validateUpdateCata }