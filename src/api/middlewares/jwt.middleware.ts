import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import User, { IUser } from "../models/user.model";
import Logger from "../../config/logger.config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/env.config";

@injectable()
export class JwtMiddleware extends BaseMiddleware {
  private logger = Logger;

  public async handler(req: Request, res: Response, next: NextFunction) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      if (!token) {
        // this.logger.verbose("user not logged in");
        res.status(401).json({
          message: "you may need log in to access this page",
        });
        return;
      }

      const decodedToken: any = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decodedToken["id"]);

      this.logger.verbose(`user is authenticated`);
      next();
    } catch (err) {
      this.logger.error("token not valid");
      res.status(401).json({
        error: err.message,
      });
    }
  }
}
