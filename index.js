import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import router from "./routes/authentication.js";
import cors from "cors";

const app = express();
//moongoose setup
const PORT = 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(router);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://bibhavpaudel2004:Bibhav9557@cluster0.8lw7rys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {})
  .catch((error) => {
    console.log(`Error is ${error}`);
  });
