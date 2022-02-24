import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import argon2 from "argon2";
import IUser from "../interfaces/IUser";
import pool from "../loaders/postgres";
import createUser from "../db-commands/auth/createUser";
import jwt from "jsonwebtoken";
import config from "../config";

@Service()
export default class AuthService {
  constructor(@Inject("logger") private logger: any) {}

  public async SignUp(
    userInput: IUser
  ): Promise<{ user: IUser; token: string }> {
    try {
      const rand = randomBytes(32);
      this.logger.silly("Hashing password...");
      const hashedPassword = await argon2.hash(userInput.password, {
        salt: rand,
      });

      this.logger.silly("Creating user in db");
      const values = [
        userInput.id,
        userInput.firstName,
        userInput.lastName,
        userInput.email,
        userInput.password,
        userInput.ln_node_pub_key,
        userInput.ln_node_address,
        userInput.ln_node_id,
        userInput.ln_url,
        userInput.lightning_public_address,
      ];
      const dbResponse = await pool.query(createUser.commandSQL, values);
      this.logger.info(dbResponse);

      const token = "";

      return { user: userInput, token };

      //   this.logger.silly("Generating jwt");
      //   this.generateToken(userInput)
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`JWT for user: ${user.id}`);

    return jwt.sign(
      {
        id: user.id,
        name: user.lastName,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
}
