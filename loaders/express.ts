import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
export default ({ app }: { app: express.Application }) => {
  app.get("/", (req, res) => {
    res.status(200).json({ status: 200, message: `Home` });
  });

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");

  app.use(cors());

  app.use(express.json());

  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    res.status(404);
    next(err);
  });

  /// error handlers
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(401).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
