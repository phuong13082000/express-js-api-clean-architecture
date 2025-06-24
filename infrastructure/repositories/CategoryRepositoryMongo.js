import CategoryModel from "../db/mongodb/schemas/CategorySchema.js";
import CategoryService from "../../domain/services/CategoryService.js";

export default class CategoryRepositoryMongo extends CategoryService {
    async getCategories() {
        return CategoryModel.find()
            .select("_id title slug image")
            .sort({createdAt: -1})
    }

    async createCategory(data) {
        return CategoryModel.create(data)
    }

    async updateCategory(id, data) {
        return CategoryModel.updateOne(id, data)
    }

    async deleteCategory(id) {
        return CategoryModel.deleteOne(id)
    }
}
