import * as Yup from "yup";
import { PRIORITIES } from "../config/constants.js";

export const createTaskSchema = Yup.object().shape({
  title: Yup.string().required(),
  desc: Yup.string(),
  dueDate: Yup.date(),
  labels: Yup.array().of(Yup.string()),
  priority: Yup.string().oneOf([PRIORITIES]),
  reminderDate: Yup.date(),
});

export const updateTaskSchema = Yup.object().shape({
  title: Yup.string(),
  desc: Yup.string(),
  dueDate: Yup.date(),
  labels: Yup.array().of(Yup.string()),
  priority: Yup.string().oneOf([PRIORITIES]),
  reminderDate: Yup.date(),
});

export const createTagSchema = Yup.object().shape({
  title: Yup.string().required(),
});

export const updateTagSchema = Yup.object().shape({
  title: Yup.string(),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
