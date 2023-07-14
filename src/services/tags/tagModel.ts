import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
});
export const TagModel = mongoose.model("category", TagSchema);
