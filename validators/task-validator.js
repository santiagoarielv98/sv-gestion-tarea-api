import Joi from "joi";
import { priorityEnum } from "../schemas/task-schema.js";

export const taskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date().iso().default(Date.now),
  labels: Joi.array().items(Joi.string()).default([]),
  priority: Joi.string()
    .valid(...priorityEnum)
    .default("medium"),
  isCompleted: Joi.boolean().default(false),
  reminderDate: Joi.date().iso().default(null),
  user: Joi.string().required(),
});
