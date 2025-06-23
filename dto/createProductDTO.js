import Joi from "joi";

export const createProductDTO = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .label("Title")
        .messages({
            "string.base": `"Title" phải là chuỗi`,
            "string.empty": `"Title" không được để trống`,
            "string.min": `"Title" phải có ít nhất {#limit} ký tự`,
            "any.required": `"Title" là bắt buộc`,
        }),

    slug: Joi.string()
        .min(3)
        .max(100)
        .required()
        .label("Slug")
        .messages({
            "string.base": `"Slug" phải là chuỗi`,
            "string.empty": `"Slug" không được để trống`,
            "any.required": `"Slug" là bắt buộc`,
        }),

    image: Joi.array()
        .items(Joi.string().uri().label("Image URL"))
        .min(1)
        .required()
        .label("Image")
        .messages({
            "array.base": `"Image" phải là mảng`,
            "array.min": `"Image" cần ít nhất 1 ảnh`,
            "any.required": `"Image" là bắt buộc`,
        }),

    category: Joi.array()
        .items(Joi.string().label("Category ID"))
        .min(1)
        .required()
        .label("Category")
        .messages({
            "array.base": `"Category" phải là mảng`,
            "array.min": `"Category" cần ít nhất 1 mục`,
            "any.required": `"Category" là bắt buộc`,
        }),

    subCategory: Joi.array()
        .items(Joi.string().label("Sub Category ID"))
        .min(1)
        .required()
        .label("Sub Category")
        .messages({
            "array.base": `"Sub Category" phải là mảng`,
            "array.min": `"Sub Category" cần ít nhất 1 mục`,
            "any.required": `"Sub Category" là bắt buộc`,
        }),

    unit: Joi.string()
        .required()
        .label("Unit")
        .messages({
            "string.base": `"Unit" phải là chuỗi`,
            "any.required": `"Unit" là bắt buộc`,
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .label("Stock")
        .messages({
            "number.base": `"Stock" phải là số nguyên`,
            "number.min": `"Stock" không được âm`,
        }),

    price: Joi.number()
        .min(0)
        .required()
        .label("Price")
        .messages({
            "number.base": `"Price" phải là số`,
            "number.min": `"Price" phải lớn hơn hoặc bằng 0`,
            "any.required": `"Price" là bắt buộc`,
        }),

    discount: Joi.number()
        .min(0)
        .max(100)
        .default(0)
        .label("Discount")
        .messages({
            "number.base": `"Discount" phải là số`,
            "number.min": `"Discount" phải ≥ 0`,
            "number.max": `"Discount" phải ≤ 100`,
        }),

    description: Joi.string()
        .allow("")
        .optional()
        .label("Description"),

    more_details: Joi.object()
        .unknown(true) // chấp nhận mọi key
        .optional()
        .label("More Details"),
});
