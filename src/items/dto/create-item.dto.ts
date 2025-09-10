import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateItemDto {
  @IsString()
  store: Types.ObjectId;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  imageUrls?: string;

@IsOptional()
  @IsArray()
  @IsNumber({}, { each: true }) // Validate each element in the array as a number
  embedding?: number[];
  

  @IsOptional()
  @IsString()
  image?: string;
}
