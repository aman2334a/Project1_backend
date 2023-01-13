const mongoose =require(`mongoose`);
// const { serviceModel } = require("./serviceModel");


const governmentschemes=mongoose.Schema({
    name:{type :String},
    desc:{type :String},
    isActive:{type:Number,default:1}
    // 1=> active ,2=>disable,3=> deleted
},
{ timestamps: true }
)

var governmentschemesModel = mongoose.model('governmentscheme', governmentschemes);

module.exports={
    governmentschemesModel
}
