const {requestModel}=require('./../../model/requestModel')
const getAllRequest=async(req,res)=>{
    try{
        let data=await requestModel.find().populate('userId').populate('serviceCategoryId');
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
module.exports={
    getAllRequest
}