export default class Order {
    constructor(
        _id,
        userId,
        orderId,
        productId,
        paymentId,
        delivery_address,
        product_details,
        payment_status,
        subTotalAmount,
        totalAmount,
        invoice_receipt,
    ) {
        this._id = _id;
        this.userId = userId;
        this.orderId = orderId;
        this.productId = productId;
        this.paymentId = paymentId;
        this.delivery_address = delivery_address;
        this.product_details = product_details;
        this.payment_status = payment_status;
        this.subTotalAmount = subTotalAmount;
        this.totalAmount = totalAmount;
        this.invoice_receipt = invoice_receipt;
    }
}
