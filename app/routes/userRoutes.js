const express=require('express')
const router=express.Router()
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
const userRoutes=require('../controller/userController')

router.post('/signup',userRoutes.signup)
router.post('/signin',userRoutes.signin)

// router.post('/signup')
module.exports=router
