const mongoose =require(`mongoose`)
const category=mongoose.Schema({
    name:{type :String},
    desc:{type:String},
    isActive:{type:Number,default:1}
    // 1=> active ,2=>disable,3=> deleted
},
{ timestamps: true }
)

var categoryModel = mongoose.model('servicecategory', category);

module.exports={
    categoryModel
}