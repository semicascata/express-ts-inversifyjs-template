import { injectable } from "inversify";
import Logger from "../../config/logger.config";
import Book, { IBook } from "../models/book.model";
import { NewBookDto } from "../dto/new-book.dto";

@injectable()
export class BookService {
  private logger = Logger;
  private bookModel = Book;

  public async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel.find();
    try {
      this.logger.verbose("retrieving all books");
      return books;
    } catch (err) {
      this.logger.error(`error retrieving books - "${err.message}"`);
      throw new Error(`error retrieving books - "${err.message}"`);
    }
  }

  public async createBook(newBookDto: NewBookDto): Promise<any> {
    const { title, author, pages, photo } = newBookDto;
    const newBook = new Book();

    newBook.title = title;
    newBook.author = author;
    pages ? (newBook.pages = pages) : (newBook.pages = 0);
    photo ? (newBook.photo = photo) : (newBook.photo = null);

    try {
      await newBook.save();
      this.logger.verbose(`new book "${title}" registered`);
      return newBook;
    } catch (err) {
      if (err.code === 11000) {
        this.logger.error(`book already exists - "${err.message}"`);
        const errMsg = err.message;
        const statusCode = err.code;
        return {
          message: errMsg,
          statusCode,
        };
      }
      this.logger.error(`error saving book - "${err.message}"`);
      const errMsg = err.message;
      const statusCode = err.code;
      return {
        message: errMsg,
        statusCode,
      };
    }
  }

  public async getSingleBook(id: string): Promise<IBook> {
    const book = await this.bookModel.findOne({ _id: id });

    try {
      this.logger.verbose(`retrieving book "${book.title}"`);
      return book;
    } catch (err) {
      this.logger.error(`failed to return book: "${err.message}"`);
      throw new Error(`failed to return book: "${err.message}"`);
    }
  }
}
