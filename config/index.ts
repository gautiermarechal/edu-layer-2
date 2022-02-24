import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Could not find .env file!");
}

export default {
  port: parseInt(process.env.PORT || "4000"),

  database: {
    user: process.env.DB_USER,

    host: process.env.DB_HOST,

    databaseName: process.env.DB_NAME,

    databasePassword: process.env.DB_PASSWORD,

    databasePort: parseInt(process.env.DB_PORT || "5432"),
  },

  jwtSecret: process.env.JWT_SECRET as Secret,
  jwtAlgorithm: process.env.JWT_ALGO,

  api: {
    prefix: "/api",
  },

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
