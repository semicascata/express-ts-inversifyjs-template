import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { BookService } from "../services/book.service";
import { Role } from "../interfaces/role.interface";
import { AuthRole } from "../middlewares/role.middleware";

@controller("/api/v1/books")
export class BookController extends BaseHttpController {
  constructor(@inject(TYPES.BookService) private bookService: BookService) {
    super();
  }

  @httpGet("/", TYPES.JwtMiddleware, AuthRole(Role.admin))
  public async getBooks(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    const content = await this.bookService.getBooks();
    const statusCode = 200;
    return this.json(content, statusCode);
  }

  @httpPost("/")
  public async createBook(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    const content = await this.bookService.createBook(req.body);
    const statusCode = 201;
    return this.json(content, statusCode);
  }

  @httpGet("/:id")
  public async getSingleBook(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    const content = await this.bookService.getSingleBook(req.params.id);
    const statusCode = 200;
    return this.json(content, statusCode);
  }
}
