import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Logger } from "winston";
import Container from "typedi";
import Class from "../../enums/routes/class";
import ClassService from "../../services/class";
import IClass from "../../interfaces/inputs/IClass";

const route = Router();

export default (app: Router) => {
  // PREFIX
  app.use(Class.MAIN, route);

  // CREATE USER ENROLLMENT
  route.post(
    Class.CREATE,
    celebrate({
      body: Joi.object({
        courseName: Joi.string().required(),
        courseId: Joi.string().required(),
        ledgerId: Joi.string().required(),
        entryFeeUsd: Joi.number().required(),
        milestoneFeeUsd: Joi.number().required(),
        entryFeeSats: Joi.number().required(),
        milestoneFeeSats: Joi.number().required(),
        totalAmountSats: Joi.number().required(),
        totalAmoutDollar: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling Create Class endpoint with body: %o", req.body);
      try {
        const classServiceInstance = Container.get<ClassService>(ClassService);
        const { id } = await classServiceInstance.CreateClass(
          req.body as IClass
        );
        return res.status(201).json({ id });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
