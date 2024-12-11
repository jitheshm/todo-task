import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/authRoute";
import todoRoute from "./routes/todoRoute";
import cookieParser from "cookie-parser";
import cors from 'cors'

import dbConnect from "./config/db/dbConnect";

const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONTENT_URL, // Frontend URL
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

dbConnect();

app.use("/api/auth", authRoute);
app.use("/api/task", todoRoute);

app.listen(3000, () => {
  console.log("server running in port 3000");
});
