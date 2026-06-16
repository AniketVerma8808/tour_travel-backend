import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import corsConfig from "./config/cors.js";
import { rateLimiter } from "./config/rateLimit.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import routes from "./routes/index.js";

const app = express();

/**
 * =====================
 * MIDDLEWARES
 * =====================
 */

// Security headers
app.use(helmet());

// CORS config
app.use(cors(corsConfig));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use(morgan("dev"));

// Rate limiting
app.use(rateLimiter);

/**
 * =====================
 * BASE ROUTE
 * =====================
 */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel Backend API Running",
  });
});

/**
 * =====================
 * API ROUTES
 * =====================
 */

app.use("/api", routes);

/**
 * =====================
 * ERROR HANDLING
 * =====================
 */

// 404 handler
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;