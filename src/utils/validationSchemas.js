import Joi from "joi";
import { PRIORITIES } from "../config/constants.js";

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().allow(""),
  dueDate: Joi.date().allow(null),
  labels: Joi.array().items(Joi.string()),
  priority: Joi.string().valid(...PRIORITIES),
  reminderDate: Joi.date().allow(null),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().allow(""),
  desc: Joi.string().allow(""),
  dueDate: Joi.date().allow(null),
  labels: Joi.array().items(Joi.string()),
  priority: Joi.string().valid(...PRIORITIES),
  reminderDate: Joi.date().allow(null),
});

export const createTagSchema = Joi.object({
  title: Joi.string().required(),
});

export const updateTagSchema = Joi.object({
  title: Joi.string().allow(""),
});

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
