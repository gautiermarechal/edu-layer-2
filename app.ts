import express from "express";

import config from "./config";

import "reflect-metadata"; // Need this for decorators

import Logger from "./loaders/logger";

async function startServer() {
  const app = express();

  await require("./loaders/index").default({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
        Server listening on port: ${config.port} 
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
