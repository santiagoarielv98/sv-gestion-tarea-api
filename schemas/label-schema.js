import mongoose, { Schema } from "mongoose";

const labelSchema = new Schema(
  {
    title: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
      required: true,
    },
    active: { type: Boolean, default: true, select: false },
  },
  { versionKey: false }
);

const Label = mongoose.model("Label", labelSchema);

export default Label;
