export default class SubCategoryUseCase {
    constructor(subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    async getAll() {
        return await this.subCategoryRepository.getAllSubCategory()
    }

    async create(data) {
        return await this.subCategoryRepository.createSubCategory(data);
    }

    async update(id, data) {
        return await this.subCategoryRepository.updateSubCategory(id, data);
    }

    async delete(id) {
        return await this.subCategoryRepository.deleteSubCategory(id);
    }

    async findIdAndUpdate(id, data) {
        return await this.subCategoryRepository.findIdAndUpdateSubCategory(id, data);
    }

    async findIdAndDelete(id) {
        return await this.subCategoryRepository.findIdAndDeleteSubCategory(id);
    }

    async findId(id) {
        return await this.subCategoryRepository.findIdSubCategory(id);
    }

    async countSubCategoriesByCategoryId(id) {
        return await this.subCategoryRepository.countSubCategoriesByCategoryId(id);
    }
}
