
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');
const key = 'mysecretkey'
const Razorpay = require('razorpay');
const { userModel } = require('./../model/userModel')
const crypto = require('crypto')
const { PaymentModel } = require('./../model/paymentModel')
var jsSHA = require("jssha");
const {categoryModel} =require('./../model/servicecategory')
const {requestModel}=require('./../model/requestModel')

const key_id = 'rzp_test_uduIzmjrW40MRu'
const key_secret = 'y7lrtcgZjnwlXTbNUU8xFw7Y'

const PAY_U_MONEY_KEY=''
const PAY_U_MONEY_SALt=''


const signup = async (req, res) => {
    userData = req.body
    console.log(userData)
    userData.created_at = new Date()
    if (!userData.email || !userData.password) {
        res.status(400).send("Username and Password are mandatory")
        return
    }
    let userNameResult = await userModel.find({ "email": userData.email })
    console.log(userNameResult)
    if (userNameResult.length > 0) {
        res.status(400).send(`username already exist`)
        return
    }
    let hashPassword = await passwordEncyption(userData.password)
    userData.password = hashPassword
    const createResult = await userModel.create(userData);
    console.log(createResult)
    if (createResult) {
        res.status(200).send(`created`)
    } else {
        res.status(500).send(`Something went wrong`)
    }



}

const signin = async (req, res) => {
    var userData = req.body
    if (!userData.email || !userData.password) {
        return res.status(400).send("Username and Password are mandatory")
    }
    let userNameResult = await userModel.find({ "email": userData.email })
    // console.log(userNameResult)
    if (userNameResult.length) {
        try {

            let passwordCompareresult = await passwordCompare(userData.password, userNameResult[0].password)
            if (passwordCompareresult) {
                var token = jwt.sign({ id: userNameResult[0].id }, key);
                res.status(200).json({
                    success: true,
                    data: token
                })

            }
        }
        catch (e) {
            console.log(e)
            res.status(400).send(`wrong password`)
        }
    } else {
        res.status(400).send(`wrong user name`)

    }


}
const payment = async (req, res) => {
    const generated_signature = crypto.createHmac('sha256', key_secret)
    console.log(req.body)
    generated_signature.update(req.body.razorpay_order_id + "|" + req.body.transactionid)
    if (generated_signature.digest('hex') == req.body.razorpay_signature) {
        console.log("match")
        try {

            const transaction = await PaymentModel.create({
                transactionid: req.body.transactionid,
                transactionamount: req.body.transactionamount,
                userId: req.user.id
            });

            let user = await userModel.findByIdAndUpdate(req.user.id,{ subscription: true })
            res.status(200).send({ transaction: user });
        } catch (e) {
            console.log(e)
            return res.status(500).send("Some Problem Occured");
        }
    }
    else {
        console.log("not match")
        return res.send('failed');
    }

}
const order = async (req, res) => {
    var instance = new Razorpay({
        key_id: key_id,
        key_secret: key_secret
    })
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 1
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json(order)
        }
    });

}

const getUserData=async(req,res)=>{
try{
    let userData=await userModel.findById(req.user.id)
    res.status(200).json({
        success:true,
        data:userData
    })
    
}catch(e){
    console.log(e)
    res.status(500).json({
        success:false,
        message:e
    })
}
}

const payUMoneyPayment=async(req,res)=>{
    if (!req.body.txnid || !req.body.amount || !req.body.productinfo   
        || !req.body.firstname || !req.body.email) {
          res.send("Mandatory fields missing");
    } else {
          var pd = req.body;
          var hashString = PAY_U_MONEY_KEY // Merchant Key 
                   + '|' + pd.txnid 
                   + '|' + pd.amount + '|' + pd.productinfo + '|'          
                   + pd.firstname + '|' + pd.email + '|' 
                   + '||||||||||' 
                   + PAY_U_MONEY_SALt // Your salt value
          var sha = new jsSHA('SHA-512', "TEXT");
          sha.update(hashString)
          var hash = sha.getHash("HEX");
          res.send({ 'hash': hash });
    }


}

const getAllServices=async(req,res)=>{
    try{
        let data=await categoryModel.find({isActive:1})
        res.status(200).json({
            success:true,
            data:data
        })
    }catch(e){
        console.error(e)
        res.status(400).json({
            success:false,
            message:e
        })
    }
}

const createNewRequest=async(req,res)=>{
    let {reason,categoryId}=req.body
    try{
        if(!reason ||!categoryId){
            throw ("parameter missing")
        }
        let inputData={
            reason:reason,
            serviceCategoryId:categoryId,
            userId:req.user.id
        }
        let data=await requestModel.create(inputData)
        res.status(201).json({
            success:true
        })


    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:e
        })

    }

}


const passwordEncyption = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        });
    })
}

const passwordCompare = (password, hash) => {
    // console.log(`password and hash::`,password,hash)
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (result) {
                resolve(result)
            }
            else if (err) {
                reject(err)
            }
            else {
                reject("password not matched")
            }
        });
    })
}

module.exports = {
    createNewRequest,getAllServices,signup, passwordCompare, passwordEncyption, signin, payment, order,getUserData,payUMoneyPayment
}