import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/auth/schemas/user.schema';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  @IsEmpty({ message: `Not pass User ID` })
  @ApiPropertyOptional()
  readonly user: User;
}
