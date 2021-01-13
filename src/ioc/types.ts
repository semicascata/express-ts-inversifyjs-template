export const TYPES = {
  // middlewares and etc
  MongoDbConnection: Symbol.for("MongoDbConnection"),
  JwtMiddleware: Symbol.for("JwtMiddleware"),

  // services
  BookService: Symbol.for("BookService"),
  HomeService: Symbol.for("HomeService"),
  AuthService: Symbol.for("AuthService"),

  // controllers
  BookController: Symbol.for("BookController"),
  HomeController: Symbol.for("HomeController"),
  AuthController: Symbol.for("AuthController"),
};
