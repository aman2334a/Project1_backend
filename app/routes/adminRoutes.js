const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const adminController=require('../controller/adminController')
const {adminAuth}=require('./../middleware/adminAuth')

router.post('/signup',adminController.signup)
router.post('/signin',adminController.signin)
router.post('/scheme',adminAuth,adminController.addScheme)
router.get('/scheme',adminAuth,adminController.getSchemes)
router.get('/service')
router.post('/service')
router.post('/updateRequestStatus')

// router.post('/signup')
module.exports=router
