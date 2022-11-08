const express = require("express");
const { createProduct, getAllProduct, singleProduct, updateProduct, deleteProduct } = require("../Controller/ProductController");
const { upload } = require("../ImgFile.js/Multer");
const router = express.Router();


router.post('/new',upload.single("product"),createProduct)

router.get('/get',getAllProduct)

router.get("/getone/:id",singleProduct)

router.put("/update/:id",upload.single("product"),updateProduct)

router.delete("/delete/:id",deleteProduct)






module.exports = router;