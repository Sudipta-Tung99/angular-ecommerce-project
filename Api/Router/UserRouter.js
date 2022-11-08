const express=require("express");
const { register, login, verify, reSendOtp, getUser } = require("../Controller/UserController");
const router = express.Router();


router.post("/register",register);
router.post("/verify/:id",verify);
router.get("/resend/:id",reSendOtp);
router.post("/login",login);
router.get("/getUser",getUser);

module.exports=router;