import mongoose from "mongoose";

export async function connectDB() {
  console.log("MONGO URI:", process.env.MONGODB_URI); // ✅ only variable name

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI);
}
