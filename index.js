import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/Post.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server Running on Port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
