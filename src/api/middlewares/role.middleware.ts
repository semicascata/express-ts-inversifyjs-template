import Logger from "../../config/logger.config";
import { Request, Response, NextFunction } from "express";
import { Role } from "../interfaces/role.interface";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/env.config";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";

// export function AuthRole(...roles: Role[]) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const user: any = jwt.verify(token, jwtSecret);

//     if (!roles.includes(user.role)) {
//       const statusCode = 403;
//       res.json({
//         message: "user role not authorized",
//         statusCode,
//       });
//       return;
//     }
//     next();
//   };
// }

@injectable()
export class AuthRole {
  public async roleAccess(...roles: Role[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization.split(" ")[1];
      const user: any = jwt.verify(token, jwtSecret);

      if (!roles.includes(user.role)) {
        const statusCode = 403;
        res.json({
          message: "user role not authorized",
          statusCode,
        });
        return;
      }
      next();
    };
  }
}
