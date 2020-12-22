import { Container } from "inversify";
import { MongoDbConnection } from "../config/mongodb.config";
import { TYPES } from "./types";
import { BookService } from "../api/services/book.service";
import { BookController } from "../api/controllers/book.controller";
import { HomeService } from "../api/services/home.service";
import { HomeController } from "../api/controllers/home.controller";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // config
    container.bind<MongoDbConnection>(TYPES.MongoDbConnection).to(MongoDbConnection).inSingletonScope();

    // services
    container.bind<BookService>(TYPES.BookService).to(BookService);
    container.bind<HomeService>(TYPES.HomeService).to(HomeService);

    // controllers
    container.bind<BookController>(TYPES.BookController).to(BookController);
    container.bind<HomeController>(TYPES.HomeController).to(HomeController);

    return container;
  }
}
