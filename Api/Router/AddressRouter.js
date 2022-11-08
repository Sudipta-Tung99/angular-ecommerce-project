const express= require("express");
const { newAddress, getOne, get, getSelect } = require("../Controller/AddressModel");
const auth = require("../Middleware/auth");
const router = express.Router();


router.post("/new",auth,newAddress);
router.get("/getOne",auth,getOne);
router.get('/get',auth,get);
router.post('/select',auth,getSelect);





module.exports = router