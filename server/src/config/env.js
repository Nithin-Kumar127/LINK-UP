import "dotenv/config";

export const ENV = {
  MONGO_URI: process.env.MONGO_URI ,
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || "development"
};

