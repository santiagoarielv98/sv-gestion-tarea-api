import Joi from "joi";

export const labelValidator = Joi.object({
  name: Joi.string().required(),
  user: Joi.string().required(),
});
