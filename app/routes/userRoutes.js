const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const userRoutes=require('../controller/userController')
const {userAuth} =require('./../middleware/userAuth')

router.post('/signup',userRoutes.signup)
router.post('/signin',userRoutes.signin)

router.post('/payment',userAuth,userRoutes.payment)
router.post('/order',userAuth,userRoutes.order)
router.get('/getProfile',userAuth,userRoutes.getUserData)


router.get('/services',userAuth,userRoutes.getAllServices)
router.post('/newRequest',userAuth,userRoutes.createNewRequest)


router.post('/payment/payumoney',userRoutes.payUMoneyPayment)

// router.post('/signup')
module.exports=router
