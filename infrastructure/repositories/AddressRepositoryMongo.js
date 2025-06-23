import AddressService from "../../domain/services/AddressService.js";
import AddressModel from "../db/mongodb/schemas/AddressSchema.js";

export default class AddressRepositoryMongo extends AddressService {
    async getAddressByUserId(userId) {
        return AddressModel.find({
            userId: userId,
            status: true,
        }).sort({createdAt: -1});
    }

    async createAddress(data) {
        return AddressModel.create(data);
    }

    async updateAddress(id, data) {
        return AddressModel.updateOne(id, data);
    }

    async findIdAndUpdateAddress(id, data) {
        return AddressModel.findByIdAndUpdate(id, data);
    }
}
