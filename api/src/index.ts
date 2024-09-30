import express, { Request, Response } from "express";
import { connectMongo } from "./config/DbConfig";
import contactRouter from "./routers/contactRouter";

const app = express();

const PORT = 8000;

//json middleware
app.use(express.json());

// connect to mongodb server
connectMongo();

// route check
app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

//routes
app.use("/api/contacts", contactRouter);

//start server// start server
try {
  app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}/`);
  });
} catch (error) {
  console.error("Error occurred while starting the server:", error);
}
