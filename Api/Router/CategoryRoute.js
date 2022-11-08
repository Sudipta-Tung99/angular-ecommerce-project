const express = require("express");
const { newCategory, updateCategory, getAllCategory, deleteCategory, getOneCategory } = require("../Controller/CategoryController");
const { upload } = require("../ImgFile.js/Multer");
const auth = require("../Middleware/auth");
const router = express.Router();



router.post("/new",upload.single("category_Image"),newCategory);

router.get('/get',getAllCategory)

router.get("/getone/:id",getOneCategory)

router.put('/update/:id',upload.single("category_Image"),updateCategory)

router.delete('/delete/:id',deleteCategory)

module.exports=router;