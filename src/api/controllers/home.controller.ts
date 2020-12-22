import { inject } from "inversify";
import { controller, httpGet, BaseHttpController } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { HomeService } from "../services/home.service";

@controller("/api/v1")
export class HomeController extends BaseHttpController {
  constructor(@inject(TYPES.HomeService) private homeService: HomeService) {
    super();
  }

  @httpGet("/")
  public async helloWorld(): Promise<JsonResult> {
    const content = await this.homeService.helloWorld();
    const statusCode = 200;
    return this.json(content, statusCode);
  }
}
