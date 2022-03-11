import { Inject, Service } from "typedi";
import { Logger } from "winston";
import { v4 as uuidv4 } from "uuid";
import pool from "../loaders/postgres";
import createClass from "../db-commands/class/createClass";
import IClass from "../interfaces/inputs/IClass";

@Service()
export default class ClassService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async CreateClass(classObject: IClass): Promise<{ id: string }> {
    try {
      const {
        courseName,
        courseId,
        ledgerId,
        entryFeeUsd,
        milestoneFeeUsd,
        entryFeeSats,
        milestoneFeeSats,
        totalAmountSats,
        totalAmoutDollar,
      } = classObject;
      this.logger.silly("Creating class in db");
      const values = [
        uuidv4(),
        courseName,
        courseId,
        ledgerId,
        entryFeeUsd,
        milestoneFeeUsd,
        entryFeeSats,
        milestoneFeeSats,
        totalAmountSats,
        totalAmoutDollar,
      ];

      const dbResponse = await pool.query(createClass.commandSQL, values);
      const newClassObject = await dbResponse.rows[0];
      this.logger.silly("New class created!✅");
      return newClassObject;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
