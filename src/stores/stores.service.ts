import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from 'src/schemas/store.schema';
import { Model } from 'mongoose';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storeModel.create(createStoreDto);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.find().exec();
  }

  async findOne(id: string): Promise<Store | null> {
    const store = await this.storeModel.findById(id).exec();

    if (!store) {
      throw new NotFoundException(`Store with id '${id}' not found`);
    }
    return store;
  }

  async update(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    const store = await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .exec();
    if (!store) {
      throw new NotFoundException(`Store with id '${id}' not found`);
    }
    return store;
  }

  async remove(id: string) {
    const store = await this.storeModel.findByIdAndDelete(id).exec();
    if (!store) {
      throw new NotFoundException(`Store with id '${id}' not found`);
    }
    return store;
  }
}
