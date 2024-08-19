import mongoose, { Schema } from "mongoose";
import { PRIORITIES } from "../config/constants.js";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    dueDate: { type: Date, default: Date.now },
    tags: [{ type: Schema.Types.ObjectId, ref: "Label" }],
    priority: { type: String, enum: PRIORITIES, default: "medium" },
    completed: { type: Boolean, default: false },
    deletedAt: { type: Date, select: false },
    reminderDate: { type: Date },
    active: { type: Boolean, default: true, select: false },
    user: {
      type: String,
      ref: "User",
      select: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
