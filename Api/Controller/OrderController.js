const { cartModel } = require("../Model/CartModel");
const { orderModel, validOrder } = require("../Model/orderModel");
const { userModel } = require("../Model/UserModel");
const { instance } = require("../utils/Payment");

exports.cashOnDeliveryCart = async (req, res) => {
try{
    const { id, totalprice, address, qty } = req.body.data
    const { error } = validOrder({
        paymentType: req.body.paymentType
    })
    if (error) {
        return res.status(401).json(error.details[0])
    } else {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        if (req.body.paymentType == "offline") {
            const order = await orderModel.create({
                address: address,
                totalPrice: totalprice,
                qty: qty,
                orderUserId: req.user._id,
                paymentType: req.body.paymentType,
                product: id
            })

            const cartItem = await cartModel.find({ userId: req.user._id })
            cartItem.forEach(async (item) => {
                await cartModel.findByIdAndRemove({ _id: item._id })
            });
            res.status(200).json({
                message: "successfully order"
            })
        }else{
            res.status(400).json({
                message: " online mode not available "
            })
        }
    }
}catch(err){
    res.status(400).json(err)
}
}

exports.cashOnDeliveryCartBuy = async (req, res) => {
try{
    const { id, totalprice, address, qty } = req.body.data
    const { error } = validOrder({
        paymentType: req.body.paymentType
    })
    if (error) {
        return res.status(401).json(error.details[0])
    } else {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        if (req.body.paymentType == "offline") {
            const order = await orderModel.create({
                address: address,
                totalPrice: totalprice,
                qty: qty,
                orderUserId: req.user._id,
                paymentType: req.body.paymentType,
                product: id
            })
            res.status(200).json({
                message: "successfully order"
            })
        }else{
            res.status(400).json({
                message: " online mode not available "
            })
        }
    }
}catch(err){
    res.status(400).json(err)
}
}

exports.get=async(req,res)=>{
    try{
        const orderItem = await orderModel.find({isdelivered:false}).sort({_id:-1}).populate({
            path:"product",
        }).populate({
            path:"address",
        })
        res.status(200).json(orderItem)
    }catch(err){
        res.status(400).json(err)
    }
}
exports.getDelivered=async(req,res)=>{
    try{
        const orderItem = await orderModel.findByIdAndUpdate({_id:req.params.id},{isdelivered:true})
        res.status(200).json("your product is delivered")
    }catch(err){
        res.status(400).json(err)
    }
}
exports.getDeliveredRecipt=async(req,res)=>{
    try{
        const orderItem = await orderModel.findByIdAndUpdate({_id:req.params.id},{pdf:true})
        res.status(200).json("your product is delivered")
    }catch(err){
        res.status(400).json(err)
    }
}

exports.getone=async(req,res)=>{
    try{
        const orderItem = await orderModel.findOne({_id:req.params.id}).populate({
            path:"product",
        }).populate({
            path:"address",
        })
        res.status(200).json(orderItem)
    }catch(err){
        res.status(400).json(err)
    }
}

exports.getAllDelivered=async(req,res)=>{
    try{
        const orderItem = await orderModel.find({isdelivered:true}).sort({_id:-1}).populate({
            path:"product",
        }).populate({
            path:"address",
        })
        res.status(200).json(orderItem)
    }catch(err){
        res.status(400).json(err)
    }
}



exports.getOrder = async(req,res)=>{
    try{
    const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        const orderItem = await orderModel.find({ orderUserId: userData._id }).sort({_id:-1}).populate({
            path:"product",
        }).populate({
            path:"address",
        })
        res.status(200).json(orderItem)
    }catch(err){
        res.status(400).json(err)
    }

}

exports.cancel=async(req,res)=>{
    try{
    const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        await orderModel.findByIdAndUpdate({_id:req.params.id},{Activeorder:false})
        res.status(200).json("Order successfully cancel")
    }catch(err){
        res.status(400).json(err)
    }
}

//rozerpay

exports.checkout = async(req,res)=>{
    try{
    var options = {
        amount: Number(req.body.amount*100),  
        currency: "INR",
      };
     const order= await instance.orders.create(options)
     res.status(200).json({
        message:true,
        data:order
     })
    }catch(err){
        res.status(400).json(err)
    }
}

exports.paymentVerify = async(req,res)=>{
    try{
    const { id, price, address, qty, payment_id,order_id } = req.body
    const { error } = validOrder({
        paymentType: req.body.paymentType
    })
    if (error) {
        return res.status(401).json(error.details[0])
    } else {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        if (req.body.paymentType == "online") {
            const order = await orderModel.create({
                address: address,
                totalPrice: price,
                qty: qty,
                razorpay_payment_id: payment_id  ,
                razorpay_order_id:order_id,
                paymentStatus:true,
                orderUserId: req.user._id,
                paymentType: req.body.paymentType,
                product: id
            })
            res.status(200).json({
                message:"Order successfully create",
             })
        }

    }
}catch(err){
    res.status(400).json(err)
}
     
}

exports.paymentCartVerify = async(req,res)=>{
    try{
    const { id, totalprice, address, qty, payment_id,order_id } = req.body
    const { error } = validOrder({
        paymentType: req.body.paymentType
    })
    if (error) {
        return res.status(401).json(error.details[0])
    } else {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        }
        if (req.body.paymentType == "online") {
            const order = await orderModel.create({
                address: address,
                totalPrice: totalprice,
                qty: qty,
                razorpay_payment_id: payment_id  ,
                razorpay_order_id:order_id,
                paymentStatus:true,
                orderUserId: req.user._id,
                paymentType: req.body.paymentType,
                product: id
            })
            const cartItem = await cartModel.find({ userId: req.user._id })
            cartItem.forEach(async (item) => {
                await cartModel.findByIdAndRemove({ _id: item._id })
            });
            res.status(200).json({
                message:"Order successfully create",
             })
        }

    }
}catch(err){
    res.status(400).json(err)
}
     
}