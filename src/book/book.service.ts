import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const result = await this.bookModel.create(data);
    return result;
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findOne(id: string): Promise<Book> {
    const result = await this.bookModel.findById(id);
    return result;
  }

  async update(id: string, book: Book): Promise<Book> {
    const result = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    return result;
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(id);
  }
}
