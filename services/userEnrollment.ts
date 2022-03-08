import { Inject, Service } from "typedi";
import { Logger } from "winston";
import IUserEnrollment from "../interfaces/inputs/IUserEnrollment";
import { v4 as uuidv4 } from "uuid";
import pool from "../loaders/postgres";
import createUserEnrollment from "../db-commands/userEnrollment/createUserEnrollment";

@Service()
export default class UserEnrollmentService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async CreateUserEnrollment(
    userEnrollmentInput: IUserEnrollment
  ): Promise<{ id: string }> {
    try {
      const { userId, courseId, dateEnrollment, userProgress } =
        userEnrollmentInput;
      this.logger.silly("Creating user enrollment in db");
      const values = [uuidv4(), userId, courseId, dateEnrollment, userProgress];

      const dbResponse = await pool.query(
        createUserEnrollment.commandSQL,
        values
      );
      const newUserEnrollment = await dbResponse.rows[0];
      this.logger.silly("New user enrollment created!✅");
      return { id: newUserEnrollment.id };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
