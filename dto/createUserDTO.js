import Joi from "joi";

export const createUserDTO = Joi.object({
    name: Joi.string()
        .pattern(/^[\p{L}\s\-']+$/u)
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.pattern.base': 'Name can only contain letters, spaces, dashes, and apostrophes',
            'string.min': 'Name must be at least {#limit} characters',
            'string.max': 'Name must not exceed {#limit} characters',
        }),

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
