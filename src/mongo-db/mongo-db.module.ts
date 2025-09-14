import { Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';

@Module({
  controllers: [],
  providers: [MongoDbService],
  exports:[MongoDbService]
})
export class MongoDbModule {}
