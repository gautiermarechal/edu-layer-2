import { Router } from "express";
import auth from "./routes/auth";
import userEnrollment from "./routes/userEnrollment";
import classRoute from "./routes/class";
export default () => {
  const app = Router();
  auth(app);
  userEnrollment(app);
  classRoute(app);

  return app;
};
