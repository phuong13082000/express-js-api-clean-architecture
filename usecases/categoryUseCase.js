export default class CategoryUseCase {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getAll() {
        return await this.categoryRepository.getCategories();
    }

    async create(data) {
        return await this.categoryRepository.createCategory(data);
    }

    async update(id, data) {
        return await this.categoryRepository.updateCategory(id, data);
    }

    async delete(id) {
        return await this.categoryRepository.deleteCategory(id);
    }
}
