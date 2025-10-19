import { Express } from 'express'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/util/multerOptions';
import { FindById } from './dto/findID-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemsService.create(file, createItemDto);
  }

  @Post('get-similar')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  searchSimilarItems(@UploadedFile() file: Express.Multer.File) {
    return this.itemsService.searchSimilarItems(file);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindById) {
    return this.itemsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindById, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(params.id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param() params: FindById) {
    return this.itemsService.remove(params.id);
  }
}
