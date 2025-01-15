import { app } from "./app.js";
import connectDB from "./db/DB.js";
import dotenv from "dotenv";
// const http = require("http");
import http from "http";
dotenv.config({
  path: "./env",
});

const PORT = 5005;
const server = http.createServer(app);
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed....", error);
  });
