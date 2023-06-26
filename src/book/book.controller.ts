import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtAuthGuard)
  async createBook(
    @Body()
    createBookDto: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(createBookDto, req.user);
  }

  @Get()
  // @UseGuards(AuthGuard())
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getbook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findOne(id);
  }

  // @Put(':id')
  // async updateBook(
  //   @Param('id')
  //   id: string,
  //   @Body()
  //   updateBookDto: UpdateBookDto,
  // ): Promise<Book> {
  //   return this.bookService.update(id, updateBookDto);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book> {
    return await this.bookService.delete(id);
  }
}
