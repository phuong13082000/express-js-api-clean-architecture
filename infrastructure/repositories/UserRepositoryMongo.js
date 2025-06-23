import UserService from "../../domain/services/UserService.js";
import UserModel from "../db/mongodb/schemas/UserSchema.js";

export default class UserRepositoryMongo extends UserService {
    async getUserById(id, select) {
        return UserModel.findById(id).select(select);
    }

    async getUserByEmail(email) {
        return UserModel.findOne({email});
    }

    async createUser(data) {
        return UserModel.create(data);
    }

    async updateUser(id, data) {
        return UserModel.updateOne(id, data);
    }

    async findByIdAndUpdateUser(id, data) {
        return UserModel.findByIdAndUpdate(id, data);
    }

    async findOneAndUpdateUser(id, data) {
        return UserModel.findOneAndUpdate(id, data);
    }
}
