const { validSlide, slideModel } = require("../Model/SliderModel")


exports.newSlider = async (req, res) => {
    try{
        const {error} = validSlide(req.file.filename)
        if(error){
            return res.status(400).send(error.details[0])
        }
        const slidedata = await slideModel.create(req.file.filename)
        res.send(slidedata)

    }catch(err){
        res.send(err)
    }
}

exports.getSlide = async(req,res)=>{
    try{
        const getdata = await slideModel.find()
        res.send(getdata)

    }catch(err){

    }
}