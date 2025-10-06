import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  links?: { type: string; url: string }[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  categories?: string[];
}
