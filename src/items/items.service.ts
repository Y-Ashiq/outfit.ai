import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { OpenaiService } from 'src/services/openai/openai.service';
import { imagekit } from 'src/configs/imagekit.config';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { Model, Types } from 'mongoose';
import { MongoDbService } from 'src/services/mongo-db/mongo-db.service';
import { Store } from 'src/schemas/store.schema';
// import * as fs from 'fs';
// import * as path from 'path';

@Injectable()
export class ItemsService {
  constructor(
    private readonly openai: OpenaiService,
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(Store.name) private storeModel: Model<Store>,
    private readonly mongoService: MongoDbService,
  ) {}

  async create(file: Express.Multer.File, body: CreateItemDto) {
    const isExist = await this.storeModel.findById(body.store).exec();

    if (!isExist) {
      throw new NotFoundException(`Store with id '${body.store}' not found`);
    }

    const imgURl = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const imgDesc = await this.openai.outfitDescription(imgURl.url);

    if (imgDesc === 'no outfit detected.') {
      throw new NotAcceptableException('No outfit detected.');
    } else {
      const embedded = await this.openai.getEmbedding(imgDesc);
      body.imageUrls = imgURl.url;
      body.embedding = embedded;
      body.description = imgDesc;
      body.store = new Types.ObjectId(body.store);

      return await this.itemModel.create(body);
    }
  }

  async searchSimilarItems(file: Express.Multer.File) {
    const imgURl = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const db = this.mongoService.getDb();

    // const tempPath = path.join(__dirname, `${Date.now()}-${file.originalname}`);
    // fs.writeFileSync(tempPath, file.buffer);

    let imgDesc = '';

    imgDesc = await this.openai.outfitDescription(imgURl.url);
    console.log(imgDesc);

    if (imgDesc === 'No outfit detected.') {
      throw new NotAcceptableException('No outfit detected.');
    }

    const embedded = await this.openai.getEmbedding(imgDesc);

    const results = await db
      .collection('items')
      .aggregate([
        {
          $vectorSearch: {
            index: 'vector_index',
            queryVector: embedded,
            path: 'embedding',
            exact: true,
            limit: 5,
          },
        },
        {
          $project: {
            embedding: 0,
          },
        },
        {
          $lookup: {
            from: 'stores',
            localField: 'store', // field in current collection
            foreignField: '_id', // field in other collection
            as: 'StoreInfo',
          },
        },
      ])
      .toArray();

    await imagekit.deleteFile(imgURl.fileId);

    return results;
  }

  findAll() {
    return this.itemModel.find().populate('store').select('-embedding').exec();
  }

  findOne(id: string) {
    return this.itemModel
      .findById(id)
      .populate('store')
      .select('-embedding')
      .exec();
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .populate('store')
      .select('-embedding')
      .exec();
  }

  remove(id: string) {
    return this.itemModel.findByIdAndDelete(id).exec();
  }
}
