const { validAdress, addressModel } = require("../Model/AddressModel");
const { userModel } = require("../Model/UserModel");

exports.newAddress = async (req, res) => {
    try {
        const { name, number, address, locality, landmark, city, alternativeNumber, addressType, pincode, state } = req.body
        const { error } = validAdress({
            name, number, address, locality, landmark, city, addressType, pincode, state
        });
        if (error) {
            return res.status(400).json(error.details)
        }
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        } else {
            const data = await addressModel.findOne({ userId: userData._id, })
            if (data) {
                const address = await addressModel.find({ userId: userData._id, })
                address.forEach(async function (user) {
                    await addressModel.findByIdAndUpdate(user._id, { active: false })
                })
            }
            const addressData = await addressModel.create({
                userId: userData._id,
                name,
                number, address, locality, landmark, city, alternativeNumber, addressType, pincode, state

            })
            res.status(200).json({
                addressData
            })

        }
    } catch (err) {
        res.status(400).send(err)
    }

}

exports.getOne = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(400).json("You are not authenticate")
        } else {
            const addressData = await addressModel.findOne({ userId: userData._id, active: true })

            res.status(200).json(addressData)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}


exports.getSelect = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user._id })
        if (!userData) {
            return res.status(401).json({
                message: "Token not found"
            });
        } else {
            const address = await addressModel.find({ userId: userData._id, })
            if (address.length>1) {
                address.forEach(async function (user) {
                    await addressModel.findByIdAndUpdate(user._id, { active: false })
                })
            }
            await addressModel.findByIdAndUpdate({ _id: req.body.id }, { active: true })
            const addressData = await addressModel.findOne({ _id: req.body.id })
            res.status(200).json(addressData)
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.get = async (req, res) => {
    try{
    const userData = await userModel.findOne({ _id: req.user._id })
    if (!userData) {
        return res.status(400).json("You are not authenticate")
    } else {
        const addressData = await addressModel.find({ userId: userData._id })
        res.status(200).json(addressData)
    }
}catch(err){
    res.status(400).send(err)
}
}
