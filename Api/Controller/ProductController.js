const { productModel, validate } = require("../Model/ProductModel");
const fs = require("fs");
const { CategoryModel } = require("../Model/CategoryModel");


exports.createProduct = async(req,res)=>{
    
    try{
        const {name,category,description,price,stock} = req.body;
        const file = req.file.filename
        const {error} = validate({
            product_name:name,category,description,price,stock,
            product_image:file

        })
       if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
       }
        
        const isSame = await productModel.findOne({item_name:name})
        if(isSame){
            return res.status(400).json({
                message:"Same name does not exist"
            })
        }
        const categoryName = await CategoryModel.findOne({_id:category})
        const product = await productModel.create({
            item_img:file,
            item_name:name,
            category:categoryName._id,
            description,
            price,
            stock

        })
        res.send(product)
        
    }catch(err){
        res.send(err)
    }
}

exports.getAllProduct=async(req,res)=>{
    try{
        const product = await productModel.find().sort({_id:-1}).populate("category","category_name")
        res.send(product)

    }catch(err){
        res.send(err)
    }
}

exports.singleProduct = async(req,res)=>{
    try{
        const product = await productModel.findOne({_id:req.params.id}).populate("category","category_name")
        res.status(200).send(product)

    }catch(err){
        res.send(err)
    }
}

exports.updateProduct = async(req,res)=>{
    try{
    const data = await productModel.findOne({ _id: req.params.id })
    const {name,category,describe,price,stock} = req.body;
        const file = req.file
        const update = await productModel.findByIdAndUpdate(req.params.id, {
            item_img:file.path,
            item_name:name,
            category,
            describe,
            price,
            stock
        })
        fs.unlink(`./uploads/${data.item_img}`, function (err) {
            console.log(err);
        })
        res.send(update)
    }catch(err){
        res.send(err)
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const data = await productModel.findOne({ _id: req.params.id })
        await productModel.findByIdAndDelete(req.params.id)
        fs.unlink(`./uploads/${data.item_img}`, function (err) {
            console.log(err);
        })
        res.status(200).json("Delete Successful")
    }catch(err){
        res.status(400).send(err)
    }
}