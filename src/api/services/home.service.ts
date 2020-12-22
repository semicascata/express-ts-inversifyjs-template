import { injectable } from "inversify";
import Logger from "../../config/logger.config";

@injectable()
export class HomeService {
  private logger = Logger;

  public async helloWorld(): Promise<any> {
    this.logger.info("Hello, Express/TypeScript/InversifyJs API!");
    return {
      message: "Hello, Express/TypeScript/InversifyJs API!",
    };
  }
}
