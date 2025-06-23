import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.ObjectId, ref: 'product'},
    userId: {type: mongoose.Schema.ObjectId, ref: "user"},
    quantity: {type: Number, default: 1},
}, {
    timestamps: true
})

const CartModel = mongoose.model('cart', CartSchema)

export default CartModel
