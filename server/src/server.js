import express from "express";

import { ENV } from "./config/env.js";

const app = express();

app.listen(ENV.PORT, () => {
  console.log("Server is running on port", ENV.PORT);
});

app.get("/", (req, res) => {
  res.send("Hello World!1234");
});

console.log("mongo uri:", ENV.MONGO_URI); 
