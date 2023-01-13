const {userModel} =require('./../../model/userModel')
const {PaymentModel}=require('./../../model/paymentModel')
exports.getAllUser=async(req,res)=>{
    try{
        let data=await userModel.find()
        res.status(200).json({
            success:true,
            data:data
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:e
        })
    }
}

exports.getAllTransactions=async(req,res)=>{
    try{

        let data=await PaymentModel.find().populate('userId')
        res.status(200).json({
            success:true,
            data:data
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:e
        })
    }

}