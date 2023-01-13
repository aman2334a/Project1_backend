const mongoose =require(`mongoose`);
const { serviceModel } = require("./serviceModel");
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const payment=mongoose.Schema({
    transactionid:{type :String},
    transactionamount:{type :String},
    // 1=> active ,2=>disable,3=> deleted
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},
{ timestamps: true }
)

var PaymentModel = mongoose.model('payment', payment);

module.exports={
    PaymentModel
}