import dotenv from "dotenv";
dotenv.config();

import express, { Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection";
import router from "./routes/v1";
import deserialize from "./middleware/deserializeUser";

const app = express();
const port = process.env.DB_PORT || 5432;

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "GenTech API Documentation",
    version: "1.0.0",
    description: "API documentation for the GenTech TypeScript application",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Development server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts", 
    "./src/routes/**/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// CORS options
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Enable CORS
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(morgan("combined", {
  skip: (req, res) => res.statusCode < 400 // Only log errors
})); // Minimal request logging
app.disable("x-powered-by"); // Hide server technology info

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Custom middleware
app.use(deserialize);

// API routes
app.use("/api/v1", router);

// Simple health check endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Start server and connect to the database
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  connect(); // Establish database connection
});

export default app;
