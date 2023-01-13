const { categoryModel } = require('./../../model/servicecategory')
const { subcategoryModel } = require('./../../model/subcategory')

const addCategory = async (req, res) => {
    const { name, desc } = req.body
    try {
        if (!name || !desc) {
            throw ("paramters are missing")
        }
        let categoryData = await categoryModel.create({ name: name, desc: desc })
        res.status(201).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false,
            message: e
        })
    }

}
const getAllCategory = async (req, res) => {
    try {
        let categoryData = await categoryModel.find().lean()
        let tmpData = [...categoryData]
        for (let x in tmpData) {
            categoryData[x].subCategory = await subcategoryModel.find({ categoryId: tmpData[x]._id })
        }
        res.status(200).json({
            success: true,
            data: categoryData
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: e
        })
    }

}
const getCategoryById = async (req, res) => {
    const { id: categoryId } = req.params
    try {
        if (!categoryId) {
            throw ("Parameter missing")
        }
        let data = await categoryModel.findById(categoryId)
        if (!Object.keys(data)) {
            throw ("invalid category Id")

        } else {
            res.status(200).json({
                success: true,
                data: data
            })

        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: e
        })
    }

}
const updateCategory = async (req, res) => {
 const { name, desc } = req.body
 const {id:categoryId}=req.params
    try {
        if (!name || !desc || !categoryId) {
            throw ("paramters are missing")
        }
        let categoryData = await categoryModel.findByIdAndUpdate(categoryId,{ name: name, desc: desc })
        res.status(201).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false,
            message: e
        })
    }
}
const deleteCategory = async (req, res) => {
    const {id:categoryId}=req.params
        console.log(categoryId)
    try {
        if (!categoryId) {
            throw ("paramters are missing")
        }
        let categoryData = await categoryModel.findByIdAndDelete(categoryId)
        res.status(201).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false,
            message: e
        })
    }
}
module.exports = {
    addCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory
}