import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: {type: String, default: ""},
    slug: {type: String, default: ""},
    image: {type: String, default: ""}
}, {
    timestamps: true
})

const CategoryModel = mongoose.model('category', CategorySchema)

export default CategoryModel
