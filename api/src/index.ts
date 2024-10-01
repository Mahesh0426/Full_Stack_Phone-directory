import express, { Request, Response } from "express";
import { connectMongo } from "./config/DbConfig";
import contactRouter from "./routers/contactRouter"; // Make sure this path is correct
import cors from "cors";

const app = express();
const PORT = 8000;

// CORS options
const corsOptions = {
  credentials: true,
  origin: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectMongo();

// Simple health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// Use your contact router (ensure the path matches the one you expect in Postman)
app.use("/api/contacts", contactRouter);

// Start the server
try {
  app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}/`);
  });
} catch (error) {
  console.error("Error occurred while starting the server:", error);
}
