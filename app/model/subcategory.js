const mongoose = require(`mongoose`)
// const { categoryModel } = require('./servicecategory')
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const subcategory = mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    categoryId: ObjectId,
    isActive: { type: Number, default: 1 }
    // 1=> active ,2=>disable,3=> deleted
},
    { timestamps: true }
)

var subcategoryModel = mongoose.model('subcategory', subcategory);

module.exports = {
    subcategoryModel
}