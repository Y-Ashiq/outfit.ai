import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FindById } from './dto/findID-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindById) {
    
    return this.storesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindById, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(params.id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param() params: FindById) {
    return this.storesService.remove(params.id);
  }
}
