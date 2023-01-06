const mongoose =require(`mongoose`)


const user=mongoose.Schema({
    name:{type :String},
    email:{type :String},
    password:{type :String},
    subscription:{type:Boolean},
    status:{type:Boolean}
    
},
{ timestamps: true }
)

var userModel = mongoose.model('user', user);

module.exports={
    userModel
}