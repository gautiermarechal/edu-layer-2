import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import argon2 from "argon2";
import IUser from "../interfaces/models/IUser";
import pool from "../loaders/postgres";
import createUser from "../db-commands/auth/createUser";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { Logger } from "winston";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user";
import IUserSignup from "../interfaces/inputs/IUserSignup";
import IUserLogin from "../interfaces/inputs/IUserLogin";
import getUserByEmail from "../db-commands/auth/getUserByEmail";

@Service()
export default class AuthService {
  constructor(@Inject("logger") private logger: Logger) {}

  public async SignUp(
    userInput: IUserSignup
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      this.logger.silly("Hashing password...");
      const hashedPassword = await argon2.hash(userInput.password, {
        salt,
      });

      this.logger.silly("Creating user in db");
      const values = [
        uuidv4(),
        "userInput.firstName",
        "userInput.lastName",
        userInput.email,
        hashedPassword,
        "userInput.ln_node_pub_key",
        "userInput.ln_node_address",
        "userInput.ln_node_id",
        "userInput.ln_url",
        "userInput.lightning_public_address",
        salt.toString("hex"),
      ];
      const dbResponse = await pool.query(createUser.commandSQL, values);
      const newUserCredentials = await dbResponse.rows[0];

      this.logger.silly("Generating jwt");
      const token = this.generateToken(newUserCredentials);

      const user = newUserCredentials;
      delete user.password;
      delete user.salt;

      return { user, token };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`JWT for user: ${user.id}`);

    this.logger.info(`config.jwtSecret: ${JSON.stringify(config)}`);

    return jwt.sign(
      {
        id: user.id,
        name: user.last_name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret as Secret
    );
  }

  public async Login(
    userInput: IUserLogin
  ): Promise<{ user: IUser; token: string }> {
    try {
      const dbResponse = await pool.query(getUserByEmail.commandSQL, [
        userInput.email,
      ]);
      if (!dbResponse.rows[0]) {
        throw new Error("Email not found");
      }

      const userRecord = await dbResponse.rows[0];

      this.logger.info("Checking password...");
      const validPassword = await argon2.verify(
        userRecord.password,
        userInput.password
      );
      if (validPassword) {
        this.logger.info("Password is valid!");
        this.logger.info("Generating jwt");
        const token = this.generateToken(userRecord);
        const user = userRecord;
        delete userRecord.password;
        delete userRecord.salt;
        return { user, token };
      } else {
        throw new Error("Password invalid");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
