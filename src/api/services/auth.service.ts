import { injectable } from "inversify";
import Logger from "../../config/logger.config";
import UserModel from "../models/user.model";
import { NewUserDto } from "../dto/new-user.dto";
import User, { IUser } from "../models/user.model";

@injectable()
export class AuthService {
  private logger = Logger;
  private userModel = UserModel;

  public async registerUser(newUserDto: NewUserDto): Promise<any> {
    const { username, email, password, password2, role } = newUserDto;
    const newUser = new User();

    if (password !== password2) {
      this.logger.error("passwords dont match");
      return {
        error: "conflict, passwords dont match",
        statusCode: 409,
      };
    }

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.role = role;

    try {
      await newUser.save();
      this.logger.verbose(`user "${username}" registered`);
      return {
        message: `user "${username}" successfully registered`,
        role,
      };
    } catch (err) {
      this.logger.error(`failed to register user: "${err.message}"`);
      return {
        error: err.message,
        statusCode: 409,
      };
    }
  }
}
