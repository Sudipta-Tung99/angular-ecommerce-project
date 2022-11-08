const { json } = require("express");
const { cartModel } = require("../Model/CartModel");
const { userModel } = require("../Model/UserModel")

exports.addItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            res.status(400).json("Please log in ");
        }
        const cartItem = await cartModel.findOne({ productId: productId, userId: userData._id })
        if (cartItem) {
            const cart = await cartModel.findByIdAndUpdate({ _id: cartItem._id }, { qty: cartItem.qty + 1 })
            res.status(200).json(cart)
        }
        else {
            const newCart = await cartModel.create({
                userId: userData._id,
                productId: productId,
                qty: 1

            })
            res.status(200).json(newCart)
        }



    } catch (err) {
        res.json(err)
    }
}

exports.removeItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            res.status(400).json("Please log in ");
        }
        const cartItem = await cartModel.findOne({ productId: productId, userId: userData._id })
        if (cartItem.qty == 1) {
            await cartModel.findByIdAndRemove({ _id: cartItem._id })
            return res.send("Product remove")
        }
        if (cartItem) {
            const cart = await cartModel.findByIdAndUpdate({ _id: cartItem._id }, { qty: cartItem.qty - 1 })
            res.json(cart)
        }
    } catch (err) {
        res.json(err)
    }
}

exports.allCartProduct = async (req, res) => {

    try {
        const cartData = await cartModel.find({ userId: req.user._id }).populate({
            path: "productId",
            populate: [
                {
                    path: "category",
                    select: "category_name"
                }
            ]
        })
        if (!cartData) {
            return res.json("Please Add Your product")
        }
        res.send(cartData)
    } catch (err) {
        res.json(err)
    }

}

exports.totalCart = async (req, res) => {
    try {
        const totalCart = await cartModel.find({ userId: req.user._id })
        var element = 0
        for (let index = 0; index < totalCart.length; index++) {
            element = element + 1

        }
        res.status(200).json({
            message: true,
            data: element
        })

    } catch (err) {

    }
}

exports.deleteItem = async (req, res) => {
    try {
        

        await cartModel.findByIdAndRemove({ _id: req.params.id })
        res.status(200).json({
            message:"delete Successfully"})

    } catch (err) {

    }
}

