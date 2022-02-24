import { Router, Request, Response, NextFunction } from "express";
import AuthRoutes from "../../enums/routes/auth";
import { celebrate, Joi } from "celebrate";
import { Logger } from "winston";
import Container from "typedi";
import AuthService from "../../services/auth";
import IUser from "../../interfaces/IUser";
import AuthRegex from "../../enums/regex/auth";

const route = Router();

export default (app: Router) => {
  app.use(AuthRoutes.MAIN, route);

  route.post(
    AuthRoutes.SIGNUP,
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().regex(
          new RegExp(AuthRegex.EMAIL_VALIDATION_REGEX)
        ),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(
          req.body as IUser
        );
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
