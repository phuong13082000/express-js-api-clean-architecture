export default class Product {
    constructor(
        _id,
        title,
        slug,
        image,
        category,
        subCategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
        publish,
    ) {
        this._id = _id;
        this.title = title;
        this.slug = slug;
        this.image = image;
        this.category = category;
        this.subCategory = subCategory;
        this.unit = unit;
        this.stock = stock;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.more_details = more_details;
        this.publish = publish;
    }
}
