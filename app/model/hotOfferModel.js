const mongoose =require(`mongoose`);
const { serviceModel } = require("./serviceModel");


const Offer=mongoose.Schema({
    name:{type :String},
    des:{type :String},
},
{ timestamps: true }
)

var offerModel = mongoose.model('offer', Offer);

module.exports={
    offerModel
}