const mongoose =require(`mongoose`)


const admin=mongoose.Schema({
    name:{type :String},
    email:{type :String},
    password:{type :String},
    role:{type:Number,default: 1}
    //0=>super admin //1=>junior
},
{ timestamps: true }
)

var adminModel = mongoose.model('admin', admin);

module.exports={
    adminModel
}