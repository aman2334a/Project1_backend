const mongoose =require(`mongoose`);
const { serviceModel } = require("./serviceModel");


const request=mongoose.Schema({
    name:{type :String},
    userId:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    password:{type :String},
    status:{type:Number} ,
    //1=>New- Service Request ,2=> In Progress -Service Request,3=>Ready To Close- Service Request, 4=>Closed –Service Request
    serviceId:[{ type: Schema.Types.ObjectId, ref: 'service' }]
    
    
},
{ timestamps: true }
)

var requestModel = mongoose.model('request', request);

module.exports={
    requestModel
}