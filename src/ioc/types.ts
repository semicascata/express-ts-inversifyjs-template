export const TYPES = {
  // other
  MongoDbConnection: Symbol("MongoDbConnection"),

  // services
  BookService: Symbol.for("BookService"),
  HomeService: Symbol.for("HomeService"),

  // controllers
  BookController: Symbol.for("BookController"),
  HomeController: Symbol.for("HomeController"),
};
