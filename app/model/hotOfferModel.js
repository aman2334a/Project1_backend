const mongoose =require(`mongoose`);
const { serviceModel } = require("./serviceModel");


const Offer=mongoose.Schema({
    name:{type :String},
    desc:{type :String},
    isActive:{type:Number,default:1}
    // 1=> active ,2=>disable,3=> deleted
},
{ timestamps: true }
)

var offerModel = mongoose.model('offer', Offer);

module.exports={
    offerModel
}