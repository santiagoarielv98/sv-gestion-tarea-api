import Joi from "joi";
import { priorityEnum } from "../schemas/task-schema.js";

export const taskValidator = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string(),
  dueDate: Joi.date().iso().default(Date.now),
  labels: Joi.array().items(Joi.string()).default([]),
  priority: Joi.string()
    .valid(...priorityEnum)
    .default("medium"),
  completed: Joi.boolean().default(false),
  reminderDate: Joi.date().iso().default(null),
  user: Joi.string().required(),
});
