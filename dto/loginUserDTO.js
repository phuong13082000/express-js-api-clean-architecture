import Joi from "joi";

export const loginUserDTO = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),

    password: Joi.string()
        .min(6)
        .max(32)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters',
            'string.max': 'Password must not exceed {#limit} characters',
        }),
});
