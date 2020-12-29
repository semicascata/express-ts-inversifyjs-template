import { inject } from "inversify";
import { controller, BaseHttpController, httpPost } from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import { AuthService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";

@controller("/api/v1/auth")
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    super();
  }

  @httpPost("/register")
  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    const content = await this.authService.registerUser(req.body);
    const statusCode = 201;
    return this.json(content, statusCode);
  }

  @httpPost("/login")
  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    const content = await this.authService.loginUser(req.body);
    const statusCode = 201;
    return this.json(content, statusCode);
  }
}
