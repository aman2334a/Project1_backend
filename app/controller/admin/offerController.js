const { offerModel } = require('./../../model/hotOfferModel')
const addOffer = async (req, res) => {
    if (!req.body.name || !req.body.desc) {
        return res.status(400).json({
            success: false,
            error: 'Invalid parameter'
        })
    }
    try {
        let data = offerModel.create(req.body)
        console.log(data)
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
const getOffer = async (req, res) => {
    try {
        let data = await offerModel.find()
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

const getOfferById = async (req, res) => {
    console.log(req.params)
    const { id: offerId } = req.params
    try {
        if (!offerId) {
            throw ("invalid parameter")
        }
        let data = await offerModel.findById(offerId)
        console.log("data")
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

const updateOfferById = async (req, res) => {
    console.log(req.params)
    const { id: offerId } = req.params
    try {
        if (!offerId) {
            throw ("invalid parameter")
        }
        let data = await offerModel.findByIdAndUpdate(offerId, req.body)
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

const deleteOffer = async (req, res) => {
    const { id: offerId } = req.params
    try {
        if (!offerId) {
            throw ("invalid parameter")
        }
        let data = await offerModel.findByIdAndDelete(offerId)
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
    addOffer, getOffer, getOfferById, updateOfferById, deleteOffer
}