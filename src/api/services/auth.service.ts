import { injectable } from "inversify";
import Logger from "../../config/logger.config";
import { NewUserDto } from "../dto/new-user.dto";
import User, { IUser } from "../models/user.model";
import { CredentialsDto } from "../dto/credentials.dto";
import * as argon2 from "argon2";
import { IToken } from "../interfaces/token.interface";
import { IPayload } from "../interfaces/payload.interface";
import * as jwt from "jsonwebtoken";
import { jwtSecret, jwtExpiresIn, jwtRefresh, jwtRefresyExpiresIn } from "../../config/env.config";

@injectable()
export class AuthService {
  private logger = Logger;
  private tokenList: any = {};

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

  public async loginUser(credentialsDto: CredentialsDto): Promise<IToken> {
    const user = await User.findOne({ username: credentialsDto.username }).select("+password");

    if (!user) {
      this.logger.error(`user "${credentialsDto.username}" not found`);
      return;
    }

    // check passwords
    const isMatch = await argon2.verify(user.password, credentialsDto.password);

    if (user && isMatch) {
      const tokens: IToken = await this.createTokens(user);

      const data = {
        userId: user.id,
      };

      // token store
      this.tokenList[tokens.refreshToken] = data;

      this.logger.verbose(`user "${user.username}" logged in!`);

      return tokens;
    }
  }

  // generate tokens
  async createTokens(user: IUser): Promise<IToken> {
    const payload: IPayload = { id: user.id, role: user.role };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    const refreshToken = jwt.sign(payload, jwtRefresh, {
      expiresIn: jwtRefresyExpiresIn,
    });

    return {
      token,
      refreshToken,
    };
  }
}
