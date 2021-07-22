import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { config } from "dotenv";

//routes
import auth from "./routes/auth";
import category from "./routes/category";
import product from "./routes/product";

//config environment variable
config();

const Main = async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;
  const DB = process.env.MONGODB_URL || "mongodb://localhost/db-template"; //database url string
  try {
    //connect to the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    //bodyparser setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    //static files
    app.use(express.static(path.join(__dirname, "../uploads")));

    //routes
    app.use("/api/auth", auth);
    app.use("/api/category", category);
    app.use("/api/product", product);

    app.listen(PORT, () => {
      console.log(`app is listen on port ${PORT}!!!`);
    });
  } catch (error) {
    console.log(error);
  }
};
Main();
