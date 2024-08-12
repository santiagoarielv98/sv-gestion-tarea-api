import mongoose, { Schema } from "mongoose";
import Task from "./task-schema.js";

const labelSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", select: false },
    active: { type: Boolean, default: true, select: false },
  },
  { versionKey: false }
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
