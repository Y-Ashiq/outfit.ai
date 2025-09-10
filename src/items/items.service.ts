import { Injectable } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { OpenaiService } from 'src/openai/openai.service';
import { imagekit } from 'src/configs/imagekit.config';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schemas/item.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    private readonly openai: OpenaiService,
    @InjectModel(Item.name) private itemModel: Model<Item>,
  ) {}

  async create(file: Express.Multer.File, body: CreateItemDto) {
    const imgURl = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    // const tempPath = path.join(__dirname, `${Date.now(e)}-${file.originalname}`);
    // fs.writeFileSync(tempPath, file.buffer);
    // fs.unlinkSync(tempPath);
    const imgDesc = await this.openai.outfitDescription(imgURl.url);
    const embedded = await this.openai.getEmbedding(imgDesc);
    body.image = imgURl.url;
    body.embedding = embedded;
    body.description = imgDesc

    return await this.itemModel.create(body);
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
