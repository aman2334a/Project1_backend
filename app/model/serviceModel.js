const mongoose =require(`mongoose`)


const service=mongoose.Schema({
    name:{type :String},
    desc:{type:String},
    status:{type:Number},
    category:{type:String}
    
},
{ timestamps: true }
)

var serviceModel = mongoose.model('service', service);

module.exports={
    serviceModel
}