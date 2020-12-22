import { injectable } from "inversify";
import mongoose from "mongoose";
import { mongoUri } from "./env.config";
import Logger from "./logger.config";

@injectable()
export class MongoDbConnection {
  private logger = Logger;

  public async connectDb(): Promise<any> {
    const getConnection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    this.logger.info("[mongodb] mongodb atlas loaded");
  }
}
