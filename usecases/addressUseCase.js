export default class AddressUseCase {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }

    async getByUserId(userId) {
        return await this.addressRepository.getAddressByUserId(userId);
    }

    async create(data) {
        return await this.addressRepository.createAddress(data);
    }

    async update(id, data) {
        return await this.addressRepository.updateAddress(id, data);
    }

    async findIdAndUpdate(id, data) {
        return await this.addressRepository.findIdAndUpdateAddress(id, data);
    }
}
