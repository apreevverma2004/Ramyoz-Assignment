import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { timestamps: true } // createdAt
);

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
