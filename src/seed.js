import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/modules/admin/admin.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin123", 10);

await Admin.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: hashedPassword,
});

console.log("Admin Created");
process.exit();