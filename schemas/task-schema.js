import mongoose, { Schema } from "mongoose";

export const priorityEnum = ["low", "medium", "high", "urgent"];

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    dueDate: { type: Date, default: Date.now },
    labels: [{ type: Schema.Types.ObjectId, ref: "Label" }],
    priority: { type: String, enum: priorityEnum, default: "medium" },
    completed: { type: Boolean, default: false },
    deletedAt: { type: Date, select: false },
    reminderDate: { type: Date },
    active: { type: Boolean, default: true, select: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
      required: true,
    },
  },
  { versionKey: false }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
