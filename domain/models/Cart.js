export default class Cart {
    constructor(
        _id,
        productId,
        userId,
        quantity
    ) {
        this._id = _id;
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }
}
