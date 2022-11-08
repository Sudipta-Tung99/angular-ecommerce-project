const { CategoryModel, validateCata, validateUpdateCata } = require("../Model/CategoryModel");
const fs = require("fs");



exports.newCategory = async (req, res) => {
    try {

        const { error } = validateCata({
            category_name: req.body.category_name,
            category_Image: req.file.filename
        })
        if (error) {
            return res.status(400).json({
                message: error.details[0]
            })
        }
        else {

            const { category_name } = req.body;
            const category_Image = req.file;
            const isSame = await CategoryModel.findOne({ category_name: category_name })
            if (isSame) {
                return res.status(400).json({
                    message: "Same Category not exist"
                })
            } else {

                const categoryData = await CategoryModel.create({
                    category_name,
                    category_Image: category_Image.filename
                })
                res.json(categoryData)
            }
        }
    }
    catch (err) {
        res.json({
            message: err
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort("cata_name");
        res.send(data)
    } catch (err) {
        res.send(err)
    }
}

exports.getOneCategory = async (req, res) => {
    try {
        const data = await CategoryModel.findOne({ _id: req.params.id })
        res.send(data)
    } catch (err) {
        res.send(err)
    }

}


exports.updateCategory = async (req, res, next) => {

    try {

    const { error } = validateUpdateCata({
        category_name: req.body.category_name,
    })
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const data = await CategoryModel.findOne({ _id: req.params.id })
    if (!req.file) {
        const { category_name, category_Image } = req.body;
        const update = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, {
            category_name, category_Image
        })
        res.status(200).json(update)
    } else {
        const category_name = req.body.category_name;
        const category_Image = req.file.filename
        const update = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, {
            category_name,
            category_Image
        })
        res.status(200).json(update)
        fs.unlink(`./uploads/${data.category_Image}`, function (err) {
            console.log(err);
        })
    }
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const data = await CategoryModel.findOne({ _id: req.params.id })
        const deleteData = await CategoryModel.findByIdAndDelete(req.params.id)
        fs.unlink(`${data.cata_img}`, function (err) {
            console.log(err);
        })
        res.status(200).json({
            message: "Delete Successful"
        })
    } catch (err) {
        res.json(err)
    }
}

