const express = require("express");
const {  getOrder, cancel, cashOnDeliveryCart, cashOnDeliveryCartBuy, checkout, paymentVerify, paymentCartVerify, get, getDelivered, getAllDelivered, getAllAlreadyDelivered, getone, getDeliveredRecipt } = require("../Controller/OrderController");
const { admin } = require("../Middleware/Admin");
const auth = require("../Middleware/auth");
const router = express.Router()

router.post("/new",auth,cashOnDeliveryCart)
router.post("/newbuy",auth,cashOnDeliveryCartBuy)
router.get('/get',auth,getOrder);
router.delete('/delete/:id',auth,cancel)
router.post("/checkout",checkout)
router.post("/paymentVerify",auth, paymentVerify)
router.post("/paymentCartVerify",auth, paymentCartVerify)
router.get("/getall",auth,admin, get);
router.get("/getAllDelivered",auth,admin,getAllDelivered);
router.get("/getDelivered/:id",auth,getDelivered);
router.get("/getDeliveredRecipt/:id",auth,getDeliveredRecipt);
router.get("/getone/:id",auth,getone);
// router.get('/getAllAlreadyDelivered',getAllAlreadyDelivered)

module.exports=router