import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    user: {
      type: String,
      ref: "User",
      select: false,
      required: true,
    },
    active: { type: Boolean, default: true, select: false },
    deletedAt: { type: Date, select: false },
  },
  { versionKey: false, timestamps: true }
);

tagSchema.index({ title: 1, user: 1 }, { unique: true });

const Tag = mongoose.model("Label", tagSchema);

export default Tag;
