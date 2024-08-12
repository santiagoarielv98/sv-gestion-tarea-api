import Joi from "joi";
import { priorityEnum } from "../schemas/task-schema.js";
import { isValidObjectId } from "mongoose";

export const taskValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  desc: Joi.string(),
  dueDate: Joi.date().iso().default(Date.now).messages({
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format",
  }),
  labels: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error("Invalid label id");
        }
        return value;
      })
    )
    .default([])
    .messages({
      "array.base": "Labels must be an array",
      "string.empty": "Label cannot be empty",
    }),
  priority: Joi.string()
    .valid(...priorityEnum)
    .default("medium")
    .messages({
      "any.only": "Priority must be one of 'low', 'medium', 'high' or 'urgent'",
      "string.empty": "Priority cannot be empty, must be one of 'low', 'medium', 'high' or 'urgent'",
    }),
  completed: Joi.boolean().default(false).messages({
    "boolean.base": "Completed must be a boolean",
  }),
  reminderDate: Joi.date().iso().default(null).messages({
    "date.base": "Reminder date must be a valid date",
    "date.format": "Reminder date must be in ISO format",
  }),
})
  .options({ abortEarly: false })
  .messages({
    "object.unknown": "Unknown field: {{#label}}",
  });

export const taskUpdateValidator = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Title cannot be empty",
  }),
  desc: Joi.string(),
  dueDate: Joi.date().iso().messages({
    "date.base": "Due date must be a valid date",
    "date.format": "Due date must be in ISO format",
  }),
  addLabels: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error("Invalid label id");
        }
        return value;
      })
    )
    .messages({
      "array.base": "Labels must be an array",
      "string.empty": "Label cannot be empty",
    }),
  removeLabels: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error("Invalid label id");
        }
        return value;
      })
    )
    .messages({
      "array.base": "Labels must be an array",
      "string.empty": "Label cannot be empty",
    }),
  priority: Joi.string()
    .valid(...priorityEnum)
    .messages({
      "any.only": "Priority must be one of 'low', 'medium', 'high' or 'urgent'",
      "string.empty": "Priority cannot be empty, must be one of 'low', 'medium', 'high' or 'urgent'",
    }),
  completed: Joi.boolean().messages({
    "boolean.base": "Completed must be a boolean",
  }),
  reminderDate: Joi.date().iso().messages({
    "date.base": "Reminder date must be a valid date",
    "date.format": "Reminder date must be in ISO format",
  }),
})
  .options({ abortEarly: false })
  .messages({
    "object.unknown": "Unknown field: {{#label}}",
  });
