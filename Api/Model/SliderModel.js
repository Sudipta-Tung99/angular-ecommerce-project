const Joi = require("joi");
const mongoose = require("mongoose");

const slideSchema = mongoose.Schema({
    slider: { type: String, required: true }
})

const validSlide = (slide) => {
    const schema = Joi.object({
        slide: Joi.string().required()
    })
    return schema.validate(slide)
}

const slideModel = new mongoose.model("slider", slideSchema);

module.exports = { slideModel, validSlide }