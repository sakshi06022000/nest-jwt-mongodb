import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
