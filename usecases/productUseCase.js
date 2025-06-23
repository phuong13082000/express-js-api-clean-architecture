export default class ProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async list(query, skip, limit) {
        return await this.productRepository.getAllProducts(query, skip, limit);
    }

    async count(query) {
        return await this.productRepository.countProducts(query);
    }

    async getById(id) {
        return await this.productRepository.getProductById(id);
    }

    async getByCategory(categoryId) {
        return await this.productRepository.getProductsByCategory(categoryId);
    }

    async getByCategoryAndSubCategory(categoryId, subCategoryId, skip, limit) {
        return await this.productRepository.getProductsByCategory(categoryId, subCategoryId, skip, limit);
    }

    async create(product) {
        return await this.productRepository.createProduct(product);
    }

    async update(id, product) {
        return await this.productRepository.updateProduct(id, product);
    }

    async delete(id) {
        return await this.productRepository.deleteProduct(id);
    }
}
