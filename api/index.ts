import { Router } from "express";
import auth from "./routes/auth";
import userEnrollment from "./routes/userEnrollment";

export default () => {
  const app = Router();
  auth(app);
  userEnrollment(app);

  return app;
};
