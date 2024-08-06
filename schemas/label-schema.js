import mongoose, { Schema } from "mongoose";
import Task from "./task-schema.js";

export const colorEnum = [
  "green",
  "goldenrod",
  "purple",
  "maroon",
  "red",
  "teal",
  "yellow",
  "orange",
  "fuscia",
  "blue",
  "pink",
  "khaki",
];

const labelSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, enum: colorEnum, default: "blue" },
    user: { type: Schema.Types.ObjectId, ref: "User", select: false },
    active: { type: Boolean, default: true, select: false },
  },
  // { timestamps: true }
);

labelSchema.pre("remove", async function (next) {
  try {
    await Task.updateMany(
      { labels: this._id },
      { $pull: { labels: this._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

const Label = mongoose.model("Label", labelSchema);

export default Label;
