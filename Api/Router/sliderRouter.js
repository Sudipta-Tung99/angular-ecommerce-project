const express = require("express");
const { newSlider, getSlide } = require("../Controller/sliderController");
const { upload } = require("../ImgFile.js/Multer");
const router = express.Router();

router.post("/new",upload.single("slider"),newSlider);
router.get("/get",getSlide);

module.exports=router;