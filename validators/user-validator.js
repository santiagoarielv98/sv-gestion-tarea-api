import Joi from "joi";

export const userValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
})
  .options({ abortEarly: false })
  .messages({
    "object.unknown": "Unknown field: {{#label}}",
  });
