import ProductService from "../../domain/services/ProductService.js";
import ProductModel from "../db/mongodb/schemas/ProductSchema.js";

export default class ProductRepositoryMongo extends ProductService {
    async getAllProducts(query, skip, limit) {
        return ProductModel.find(query)
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .populate("category subCategory");
    }

    async countProducts(query) {
        return ProductModel.countDocuments(query);
    }

    async getProductById(id) {
        return ProductModel.findById(id);
    }

    async getProductsByCategory(categoryId) {
        const query = {category: {$in: categoryId}}

        return ProductModel.find(query).limit(15);
    }

    async getProductsByCategoryAndSubCategory(categoryId, subCategoryId, skip, limit) {
        const query = {
            category: {$in: categoryId},
            subCategory: {$in: subCategoryId}
        }

        return ProductModel.find(query).sort({createdAt: -1}).skip(skip).limit(limit);
    }

    async createProduct(product) {
        return ProductModel.create(product);
    }

    async updateProduct(id, product) {
        return ProductModel.updateOne({_id: id}, {$set: product});
    }

    async deleteProduct(id) {
        return ProductModel.deleteOne({_id: id});
    }
}
