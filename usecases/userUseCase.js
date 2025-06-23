export default class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getById(id, select) {
        return await this.userRepository.getUserById(id, select);
    }

    async getByEmail(email) {
        return await this.userRepository.getUserByEmail(email);
    }

    async create(data) {
        return await this.userRepository.createUser(data);
    }

    async update(id, data) {
        return await this.userRepository.updateUser(id, data);
    }

    async findIdAndUpdate(id, data) {
        return await this.userRepository.findByIdAndUpdateUser(id, data);
    }

    async findOneAndUpdate(id, data) {
        return await this.userRepository.findOneAndUpdateUser(id, data);
    }
}
