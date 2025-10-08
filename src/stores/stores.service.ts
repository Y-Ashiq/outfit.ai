import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from 'src/schemas/store.schema';
import { Model } from 'mongoose';
import { FindById } from './dto/findID-store.dto';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storeModel.create(createStoreDto);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.find().exec();
  }

  async findOne(id: FindById): Promise<Store | null> {
    return await this.storeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    return await this.storeModel
      .findByIdAndUpdate(id, updateStoreDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.storeModel.findByIdAndDelete(id).exec();
  }
}
