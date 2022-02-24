import Logger from "./logger";
import pool from "./postgres";
import expressLoader from "./express";

export default async (prop: { expressApp: any }) => {
  pool.connect((err, client, release) => {
    if (err) {
      Logger.error("Error connecting to db");
      Logger.error(err);
    }
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      Logger.info("Connected to DB");
    });
  });

  expressLoader({ app: prop.expressApp });
  Logger.info("Express loaded");
};
