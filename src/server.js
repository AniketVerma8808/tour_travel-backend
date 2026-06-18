import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
// import createAdmin from "./database/seed.js";

const PORT = env.PORT || 5000;

/**
 * =====================
 * START SERVER
 * =====================
 */

const startServer = async () => {
  try {
    await connectDB();
// await createAdmin();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();