import Joi from "joi";
import { colorEnum } from "../schemas/label-schema.js";

export const labelValidator = Joi.object({
  name: Joi.string().required(),
  color: Joi.string()
    .valid(...colorEnum)
    .default("gray"),
  user: Joi.string().required(),
});
  