import SubCategoryService from "../../domain/services/SubCategoryService.js";
import SubCategoryModel from "../db/mongodb/schemas/SubCategorySchema.js";

export default class SubCategoryRepoMongo extends SubCategoryService {
    async getAllSubCategory() {
        return SubCategoryModel.find()
            .select("_id title slug image")
            .sort({createdAt: -1})
            .populate("category", "_id title slug image")
    }

    async createSubCategory(data) {
        return SubCategoryModel.create(data)
    }

    async updateSubCategory(id, data) {
        return SubCategoryModel.updateOne(id, data)
    }

    async deleteSubCategory(id) {
        return SubCategoryModel.deleteOne(id)
    }

    async findIdAndUpdateSubCategory(id, data) {
        return SubCategoryModel.findByIdAndUpdate(id, data)
    }

    async findIdAndDeleteSubCategory(id) {
        return SubCategoryModel.findByIdAndDelete(id)
    }

    async findIdSubCategory(id) {
        return SubCategoryModel.findById(id)
    }

    async countSubCategoriesByCategoryId(id) {
        return SubCategoryModel.find({
            category: {"$in": [id]}
        }).countDocuments()
    }
}
