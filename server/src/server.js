import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "./config/env.js";
import { serve } from "inngest/express";
import { connectDB as connect } from "./config/db.js";
import { inngest, functions } from "./src/inngest"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!1234");
});

app.use(clerkMiddleware());

app.use(express.json());
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions}));

console.log("mongo uri:", ENV.MONGO_URI);

const startServer = async () => {
  try {
    await connect();
    if (ENV.NODE_ENV != "production") {
      app.listen(ENV.PORT, () => {
        console.log(
          `Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`
        );
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
