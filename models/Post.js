import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      name: String,
      data: Buffer,
      contentType: String,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
