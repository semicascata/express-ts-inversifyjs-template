export const TYPES = {
  // middlewares and etc
  MongoDbConnection: Symbol("MongoDbConnection"),
  JwtMiddleware: Symbol("JwtMiddleware"),

  // services
  BookService: Symbol.for("BookService"),
  HomeService: Symbol.for("HomeService"),
  AuthService: Symbol.for("AuthService"),

  // controllers
  BookController: Symbol.for("BookController"),
  HomeController: Symbol.for("HomeController"),
  AuthController: Symbol.for("AuthController"),
};
