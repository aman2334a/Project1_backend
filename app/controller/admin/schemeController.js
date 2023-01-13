const { governmentschemesModel } = require('./../../model/governmentschemesModel')


const addScheme = async (req, res) => {
    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({
            success: false,
            error: 'Invalid parameter'
        })
    }
    try {
        let data = governmentschemesModel.create(req.body)
        res.status(201).json({
            success: true,
            // data:data
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            success: false,
            error: e
        })
    }

}
const getSchemes = async (req, res) => {
    try {
        let data = await governmentschemesModel.find()
        console.log(data)
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false,
            error: e
        })
    }
}

const getSchemeById=async(req,res)=>{
    console.log(req.params)
    const { id: offerId } = req.params
    try {
        if (!offerId) {
            throw ("invalid parameter")
        }
        let data = await governmentschemesModel.findById(offerId)
        res.status(200).json({
            success: true,
            data: data
        })


    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false,
            message: e
        })

    }
}

const updateSchemeById=async(req,res)=>{
    console.log(req.params)
    const { id: schemeId } = req.params
    try {
        if (!schemeId) {
            throw ("invalid parameter")
        }
        let data = await governmentschemesModel.findByIdAndUpdate(schemeId, req.body)
        res.status(204).json({
            success: true,
        })


    } catch (e) {
        console.log(e)
        res.status(400).json({
            success: false,
            message: e
        })

    }
}

const deleteScheme=async(req,res)=>{
    const { id: schemeId } = req.params
    console.log("req fro deleteScheme")
    try {
        if (!schemeId) {
            throw ("invalid parameter")
        }
        let data = await governmentschemesModel.findByIdAndDelete(schemeId)
        console.log(data)
        res.status(204).json({
            success: true,
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
    addScheme, getSchemes,getSchemeById,updateSchemeById,deleteScheme
}