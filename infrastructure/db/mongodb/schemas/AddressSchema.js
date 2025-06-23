import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, default: ''},
    address_line: {type: String, default: ""},
    city: {type: String, default: ""},
    state: {type: String, default: ""},
    pinCode: String,
    country: String,
    mobile: {type: Number, default: null},
    status: {type: Boolean, default: true},
}, {
    timestamps: true
})

const AddressModel = mongoose.model('address', AddressSchema)

export default AddressModel
