import mongoose from "mongoose";

const uri =
  "mongodb+srv://aniketverma000081_db_user:HOun7ysqGTj4HN6u@cluster0.careanc.mongodb.net/test?retryWrites=true&w=majority";

try {
  await mongoose.connect(uri);
  console.log("✅ Connected");
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}