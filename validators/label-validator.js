import Joi from "joi";

export const labelValidator = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title is required",
  }),
})
  .options({ abortEarly: false })
  .messages({
    "object.unknown": "Unknown field: {{#label}}",
  });
