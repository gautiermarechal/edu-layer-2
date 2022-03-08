import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Logger } from "winston";
import Container from "typedi";
import UserEnrollment from "../../enums/routes/userEnrollment";
import UserEnrollmentService from "../../services/userEnrollment";
import IUserEnrollment from "../../interfaces/inputs/IUserEnrollment";

const route = Router();

export default (app: Router) => {
  // PREFIX
  app.use(UserEnrollment.MAIN, route);

  // CREATE USER ENROLLMENT
  route.post(
    UserEnrollment.CREATE,
    celebrate({
      body: Joi.object({
        courseId: Joi.string().required(),
        dateEnrollment: Joi.string().required(),
        userProgress: Joi.number().required(),
        userId: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug(
        "Calling Create User Enrollment endpoint with body: %o",
        req.body
      );
      try {
        const userEnrollmentServiceInstance =
          Container.get<UserEnrollmentService>(UserEnrollmentService);
        const { id } = await userEnrollmentServiceInstance.CreateUserEnrollment(
          req.body as IUserEnrollment
        );
        return res.status(201).json({ id });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
