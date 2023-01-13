const mongoose =require(`mongoose`)


const user=mongoose.Schema({
    name:{type :String},
    email:{type :String},
    password:{type :String},
    subscription:{type:Boolean,default:false},
    country:{type:String},
    mobile:{type:String},
    businessName:{type:String},
    type:{type:String},
    gstNumber:{type:String},
    referalCode:{type:String},
    isActive:{type:Number,default:1}
    // 1=> active ,2=>disable,3=> deleted
    
},
{ timestamps: true }
)

var userModel = mongoose.model('user', user);

module.exports={
    userModel
}