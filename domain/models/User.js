export default class User {
    constructor(
        name,
        email,
        password,
        avatar,
        mobile,
        refresh_token,
        verify_email,
        last_login_date,
        status,
        address_details,
        shopping_cart,
        orderHistory,
        forgot_password_otp,
        forgot_password_expiry,
        role,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.mobile = mobile;
        this.refresh_token = refresh_token;
        this.verify_email = verify_email;
        this.last_login_date = last_login_date;
        this.status = status;
        this.address_details = address_details;
        this.shopping_cart = shopping_cart;
        this.orderHistory = orderHistory;
        this.forgot_password_otp = forgot_password_otp;
        this.forgot_password_expiry = forgot_password_expiry;
        this.role = role;
    }
}
