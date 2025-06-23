import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref: 'user'},
    orderId: {type: String, required: [true, "Provide orderId"], unique: true},
    productId: {type: mongoose.Schema.ObjectId, ref: "product"},
    paymentId: {type: String, default: ""},
    delivery_address: {type: mongoose.Schema.ObjectId, ref: 'address'},
    product_details: {title: String, image: Array},
    payment_status: {type: String, default: ""},
    subTotalAmount: {type: Number, default: 0},
    totalAmount: {type: Number, default: 0},
    invoice_receipt: {type: String, default: ""}
}, {
    timestamps: true
})

const OrderModel = mongoose.model('order', OrderSchema)

export default OrderModel
