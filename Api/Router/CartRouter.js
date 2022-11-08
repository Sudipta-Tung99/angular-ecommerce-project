const express=require("express");
const { addItem, removeItem, allCartProduct, totalCart, deleteItem } = require("../Controller/Cart");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/add",auth,addItem);
router.post("/remove",auth,removeItem)
router.get("/allCart",auth, allCartProduct)
router.get("/total",auth,totalCart)
router.delete('/delete/:id',auth,deleteItem)


module.exports=router;