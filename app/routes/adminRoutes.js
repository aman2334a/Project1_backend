const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const adminUserController=require('./../controller/admin/adminAuth')
const offerController=require('./../controller/admin/offerController')
const schemeController=require('./../controller/admin/schemeController')
const categoryController=require('./../controller/admin/categoryController')
const serviceContorller=require('../controller/admin/serviceController')
const userController=require('./../controller/admin/userController')
const {adminAuth}=require('./../middleware/adminAuth')

router.post('/signup',adminUserController.signup)
router.post('/signin',adminUserController.signin)



router.post('/scheme',adminAuth,schemeController.addScheme)
router.get('/scheme',adminAuth,schemeController.getSchemes)
router.get('/scheme/:id',adminAuth,schemeController.getSchemeById)
router.put('/scheme/:id',adminAuth,schemeController.updateSchemeById)
router.delete('/scheme/:id',adminAuth,schemeController.deleteScheme)



router.post('/offer',adminAuth,offerController.addOffer)
router.get('/offer',adminAuth,offerController.getOffer)
router.get('/offer/:id',adminAuth,offerController.getOfferById)
router.put('/offer/:id',adminAuth,offerController.updateOfferById)
router.delete('/offer/:id',adminAuth,offerController.deleteOffer)


router.post('/category',adminAuth,categoryController.addCategory)
router.get('/category',adminAuth,categoryController.getAllCategory)
router.get('/category/:id',adminAuth,categoryController.getCategoryById)
router.put('/category/:id',adminAuth,categoryController.updateCategory)
router.delete('/category/:id',adminAuth,categoryController.deleteCategory)



router.get('/user',adminAuth,userController.getAllUser)


router.get('/transactions',adminAuth,userController.getAllTransactions)

router.get('/serviceRequest',adminAuth,serviceContorller.getAllRequest)
router.post('/service')
router.post('/updateRequestStatus')

// router.post('/signup')
module.exports=router
