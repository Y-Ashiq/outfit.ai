import { Injectable } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { OpenaiService } from 'src/openai/openai.service';
import { imagekit } from 'src/configs/imagekit.config';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { Model } from 'mongoose';
import { MongoDbService } from 'src/mongo-db/mongo-db.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ItemsService {
  constructor(
    private readonly openai: OpenaiService,
    @InjectModel(Item.name) private itemModel: Model<Item>,
    private readonly mongoService: MongoDbService,
  ) {}

  async create(file: Express.Multer.File, body: CreateItemDto) {
    const imgURl = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const imgDesc = await this.openai.outfitDescription(imgURl.url);
    const embedded = await this.openai.getEmbedding(imgDesc);
    body.imageUrls = imgURl.url;
    body.embedding = embedded;
    body.description = imgDesc;

    return await this.itemModel.create(body);
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
    try {
      imgDesc = await this.openai.outfitDescription(imgURl.url);
    } catch (err) {
      console.error('OpenAI description failed:', err);
      imgDesc = 'No description available';
    }
    const embedded = await this.openai.getEmbedding(imgDesc);
    console.log(imgDesc);

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
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
