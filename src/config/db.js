import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    console.log("URI =>", env.MONGO_URI);

    await mongoose.connect(env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;