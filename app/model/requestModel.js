const mongoose =require(`mongoose`);
const { serviceModel } = require("./serviceModel");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const request=mongoose.Schema({
    name:{type :String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    reason:{type:String},
    status:{type:Number,default:1} ,
    //1=>New- Service Request ,2=> In Progress -Service Request,3=>Ready To Close- Service Request, 4=>Closed –Service Request
    serviceCategoryId:{type:mongoose.Schema.Types.ObjectId,ref:'servicecategory'},
    isActive:{type:Number,default:1}
    // 1=> active ,2=>disable,3=> deleted
    
    
},
{ timestamps: true }
)

var requestModel = mongoose.model('request', request);

module.exports={
    requestModel
}