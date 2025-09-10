import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { OpenaiService } from 'src/openai/openai.service';
import { ItemModel } from 'src/schemas/item.schema';

@Module({
  imports:[ItemModel],
  controllers: [ItemsController],
  providers: [ItemsService,OpenaiService],
})
export class ItemsModule {}
