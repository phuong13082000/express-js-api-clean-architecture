export default class Address {
    constructor(
        _id,
        userId,
        address_line,
        city,
        state,
        pinCode,
        country,
        mobile,
        status,
    ) {
        this._id = _id;
        this.userId = userId;
        this.address_line = address_line;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.country = country;
        this.mobile = mobile;
        this.status = status;
    }
}
