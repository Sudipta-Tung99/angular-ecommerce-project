const { userValidation, userModel, userLoginValidation } = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/sendMail");
const { otpModel } = require("../Model/userOtp");

var otpGenerate = Math.random();
otpGenerate = otpGenerate * 1000000;
otpGenerate = parseInt(otpGenerate);

exports.register = async (req, res) => {
    try {
        const { error } = userValidation(req.body)
        if (error) {
            return res.status(400).send(error.details)
        }

        const isSame = await userModel.findOne({ email: req.body.email })
        if (isSame) {
            return res.status(400).json("Email does not exist")
        }
        const userdata = await userModel.create(req.body)

        const otp = await otpModel.create({
            userId: userdata._id,
            otp: otpGenerate,
            expire: Date.now() + 10 * 60 * 1000
        })
        const token = await userdata.getAuthToken();

        sendEmail(req.body.email, otp.otp)

        res.status(200).header('x-token', token).json({
            data:token,
            message:"OTP send to your Email Account"});
    } catch (err) {
        res.status(400).send(err)
    }
}

exports.verify = async (req, res) => {

    try {
        const { otp } = req.body;
        if(!otp){
            return res.status(400).json("Please enter OTP")
        }
        const user = await otpModel.findOne({ userId: req.params.id })
        if (!user) {
            return res.status(400).send("invalid Link")
        }
        if (user.expire < Date.now()) {
            await otpModel.findByIdAndRemove(user._id)
            res.send("OTP has been expired")
        }
        if (user.otp == otp) {
            await userModel.findByIdAndUpdate({ _id: req.params.id }, { verify: true })
            await otpModel.findByIdAndRemove(user._id)
            res.status(200).json({
                message:"Email verify Successfully"})
        }
    } catch (err) {
        res.send(err)
    }
}

exports.reSendOtp = async (req, res) => {
    const user = await userModel.findOne({ _id: req.params.id })
    const otp = await otpModel.create({
        userId: user._id,
        otp: otpGenerate,
        expire: Date.now() + 10 * 60 * 1000
    })
    sendEmail(user.email, otp.otp)
    res.status(200).send("OTP Resend to your Email Account");
}

exports.login = async (req, res) => {
    try {
        const { error } = userLoginValidation(req.body)
        if (error) {
            return res.status(400).send(error.details);
        }
        const userData = await userModel.findOne({ email: req.body.email })
        if (!userData) {
            return res.status(400).send("Please enter valid email and password")
        }
        const validPass = await bcrypt.compare(req.body.password, userData.password)
        if (!validPass) {
            return res.status(400).send("Please insert valid password")
        }
        const token = userData.getAuthToken();
        res.status(200).header('x-token', token).json(token);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getUser = async (req,res)=>{
    try{
    const userData = await userModel.find({}).sort({_id:-1})
    res.status(200).json(userData)
    }catch(err){
        
    }
}