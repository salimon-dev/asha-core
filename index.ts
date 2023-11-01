import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(`${process.env["MONGO_URI"]}/${process.env["DB_NAME"]}`);

import auth from "./methods/auth/router";

const app = express();
app.use(cors());

const port = parseInt(process.env["PORT"] || "8080");

app.get("/", (_, res) => {
  res.send({ ok: true });
});

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`started service on port ${port}`);
});
