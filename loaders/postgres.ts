import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.databaseName,
  password: config.database.databasePassword,
  port: config.database.databasePort,
});

export default pool;
