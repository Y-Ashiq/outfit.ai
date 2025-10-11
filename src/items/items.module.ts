import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { OpenaiService } from 'src/openai/openai.service';
import { ItemModel } from 'src/schemas/item.schema';
import { MongoDbService } from 'src/mongo-db/mongo-db.service';
import { StoreModel } from 'src/schemas/store.schema';

@Module({
  imports:[ItemModel,StoreModel],
  controllers: [ItemsController],
  providers: [ItemsService,OpenaiService,MongoDbService],
})
export class ItemsModule {}
